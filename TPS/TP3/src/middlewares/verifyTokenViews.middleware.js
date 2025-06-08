const jwt = require('jsonwebtoken');
const Config = require('../config/config.js');

const verifyTokenViewsMiddleware = (req, res, next) => {
  const token = req.session.token;
  
  if (!token) {
    return res.redirect("/login"); // o a donde tengas el formulario de login
  }

  try {
    const decoded = jwt.verify(token, Config.secretWord);
    req.user = decoded; // opcional, por si querés acceder a `req.user` en tu controlador
    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

module.exports = {
  verifyTokenViewsMiddleware,
};
