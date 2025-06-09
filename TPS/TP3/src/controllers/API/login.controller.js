const Config = require('../../config/config.js');
const jwt = require('jsonwebtoken');
const { LoginSchema } = require('../../schemas/login.schema.js')
class LoginController {
      async login(req, res) {
    const { password } = req.body;

      const { error } = LoginSchema.login.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

    if (!password) {
      return res.status(400).json({ error: 'La contraseña es obligatoria' });
    }
    if (password !== Config.loginPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { role: 'admin' },
      Config.secretWord,
      { expiresIn: Config.expiresIn }
    );

    res.status(200).json({ token });
  }
}

module.exports = new LoginController()