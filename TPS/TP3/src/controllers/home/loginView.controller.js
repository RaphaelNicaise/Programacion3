// controllers/views/login.controller.js
const jwt = require("jsonwebtoken");
const Config = require('../../config/config.js');


const loginViewController = (req, res) => {
  const password = req.body;
  
  if (password === "contraseña") {
    const user = { id: 1, name: username };

    const token = jwt.sign(user, "contraseña");
    req.session.token = token;

    return res.redirect("/pacientes");
  }
};

module.exports = { loginViewController };
