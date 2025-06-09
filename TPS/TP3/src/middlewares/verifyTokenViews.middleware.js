const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');

const verifyTokenViewsMiddleware = (req, res, next) => {
  const token = req.session.token;
  
  if (!token) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, Config.secretWord);
    req.user = decoded;
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

module.exports = {
  verifyTokenViewsMiddleware,
};
