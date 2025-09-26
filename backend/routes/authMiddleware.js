module.exports.isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).json({msg: "you are not authorized to see this resourse."});
    }
  }
  
