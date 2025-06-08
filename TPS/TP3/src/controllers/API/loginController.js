
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: 'La contraseña es requerida' });
    }

    if (password === process.env.LOGIN_PASSWORD) {
        const token = jwt.sign(
            { user: 'admin' },
            process.env.SECRET_WORD,
            { expiresIn: process.env.EXPIRES_IN }
        );

        return res.status(200).json({ token });
    } else {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
};
