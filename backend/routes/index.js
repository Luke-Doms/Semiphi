const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/utils.js').genPassword;
const connection = require('../config/database.js');
const path = require('path');
const isAuth = require('./authMiddleware.js').isAuth;

const User = connection.models.User;


router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: '/'}))

router.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash: hash,
    salt: salt,
  })

  newUser.save()
    .then((user) => {
      console.log(user);
    });

  res.redirect('/login');
})

router.get('/get-user', (req, res) => {
  if (req.user) {
    res.json({ 
      'username' : req.user.username, 
      'theme' : req.session.theme
    });
  };
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


/*router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

// When you visit http://localhost:3000/login, you will see "Login Page"
router.get('/login', (req, res, next) => {

    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});

// When you visit http://localhost:3000/register, you will see "Register Page"
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);


});


router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});


// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout(() => {
      req.session.destroy((err) => res.redirect('/'));
    });
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

/*
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
*/

module.exports = router;
