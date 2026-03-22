const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/utils.js').genPassword;
const connection = require('../config/database.js');
const path = require('path');
const isAuth = require('./authMiddleware.js').isAuth;
const validPassword = require('../lib/utils.js').validPassword;

const User = connection.models.User;


//router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/'}))

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      console.log('login success, user:', user.username);
      console.log('session after login:', req.session);
      return res.json({ 
        success: true, 
        });
    });
  })(req, res, next);
});

router.post('/register', async (req, res, next) => {
  const { uname, pw } = req.body;

  if (!uname || uname.length <= 2) {
    return res.status(400).json({ success: false, message: 'Username must be longer than 2 characters' });
  }

  if (!pw || pw.length < 8) {
    return res.status(400).json({ success: false, message: 'Password must be at least 8 characters' });
  }

  try {
    const existingUser = await User.findOne({ username: uname });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const saltHash = genPassword(pw);
    const newUser = new User({
      username: uname,
      hash: saltHash.hash,
      salt: saltHash.salt,
    });
    await newUser.save();
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/reset-username', isAuth, async (req, res) => {
  try {
    const { newUsername, userCurrentPw } = req.body;

    if (!newUsername || !userCurrentPw ) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // `req.user` is set by passport when logged in
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate password against stored hash + salt
    const isValid = validPassword(userCurrentPw, user.hash, user.salt);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Check that new username isn’t taken
    const existingUser = await User.findOne({ username: newUsername });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    // Update and save
    user.username = newUsername;
    await user.save();

    return res.json({ success: true, message: 'Username updated', username: newUsername });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/reset-password', isAuth, async (req, res) => {
  try {
    const { currentPw, newPw } = req.body;

    if (!currentPw || !newPw) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // `req.user` is set by passport when logged in
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate password against stored hash + salt
    const isValid = validPassword(currentPw, user.hash, user.salt);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Update and save
    const newInfo = genPassword(newPw);
    user.hash = newInfo.hash;
    user.salt = newInfo.salt;
    await user.save();

    return res.json({ success: true, message: 'Password updated'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/update-email', isAuth, async (req, res) => {
  const { newEmail, emailCurrentPw } = req.body;

  try {
    if (!newEmail || !emailCurrentPw) {
      return res.status(400).json({ success: false, message: 'Email required' });
    }

    const user = await User.findById(req.user._id);
    const isValid = validPassword(emailCurrentPw, user.hash, user.salt);
    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { email: newEmail },
      { new: true },
    );

    res.json({
      success: true,
      email: updatedUser.email,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/get-user', (req, res) => {
  if (req.user) {
    res.json({ 
      'username' : req.user.username, 
      'theme' : req.session.theme,
      'email' : req.user.email,
    });
  } else {
    res.json(null);
  };
});

router.post('/create-alg', isAuth, async (req, res) => {
  try {
    const { puzzleName, algName, moves } = req.body;
    const user = await User.findById(req.user._id);
    const key = puzzleName.replace(/×/g, 'x');

    if (!user.sequences[key]) {
      user.sequences[key] = [];
    }

    user.sequences[key].push({
      name: algName, 
      seq: moves 
    });
    
    await user.save();
    return res.json({ success: true, message: 'sequence added'});
  } catch (error) {
    console.log('API response:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})

router.get('/get-algs', isAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.json({ sequences : user.sequences });
})

router.post('/update-alg', isAuth, async (req, res) => {
  const { puzzleName, oldAlgName, algName, moves } = req.body;
  try {
    const key = puzzleName.replace(/×/g, 'x');
    const user = await User.findById(req.user._id);
    const index = user.sequences[puzzleName].findIndex(i => i.name === oldAlgName);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Algorithm not found" });
    }

    await User.updateOne(
      { _id: req.user._id },
      { 
        $set: { 
          [`sequences.${puzzleName}.${index}.name`]: algName,
          [`sequences.${puzzleName}.${index}.seq`]: moves
        }
      }
    );
    return res.json({ success: true, message: 'sequence updated' });
  } catch (error) {
    console.log('API response:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})

router.post('/delete-alg', isAuth, async (req, res) => {
  const { puzzle, algName } = req.body;
  console.log(puzzle, algName);
  try {
    const key = puzzle.replace(/×/g, 'x');
    const user = await User.findById(req.user._id);
    await User.updateOne(
      { _id: req.user._id },
      { $pull: { [`sequences.${key}`]: { name : algName } } }
    );
    return res.json({ success: true, message: 'sequence deleted' });
  } catch (error) {
    console.log('API response:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
})

router.post('/set-theme', (req, res) => {
  console.log(req.body);
  req.session.theme = req.body;
  req.session.save();
})

router.get('/2x2x2/sequences', async (req, res) => {
  console.log("hello", req.user.sequences);
  res.json(req.user.sequences);
})

router.post('/2x2x2/sequence', async (req, res) => {
  console.log("jsd", req.body);
  const up = await User.findByIdAndUpdate(req.user.id, { $push: {sequences: req.body}});
  res.status(200).json(up);
})

router.delete('/2x2x2/sequence/:id', async (req, res) => {
  console.log(req.user.id, req.params.id)
  const del = await User.findByIdAndUpdate(req.user.id, {$pull: {sequences: {_id: req.params.id}}});
  res.json(del);
})

router.get('/2x2x2/times', async (req, res) => {
  console.log(req.user.times);
  res.json(req.user.times);
})

router.post('/2x2x2/time', async (req, res) => {
  console.log("hello");
  const up = await User.findByIdAndUpdate(req.user.id, { $push: {times: req.body}});
  res.status(200).json(up);
})

router.delete('/2x2x2/time/:id', async (req, res) => {
  console.log(req.user.id, req.params.id)
  const del = await User.findByIdAndUpdate(req.user.id, {$pull: {times: {_id: req.params.id}}});
  res.json(del);
})

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout(() => {
      req.session.destroy((err) => res.redirect('/'));
    });
});

module.exports = router;
