const jwt = require("jsonwebtoken");
const Config = require("../config/config.js");
const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token de acceso no proporcionado" });
  }
  const token = authHeader;

  try {

    const decoded = jwt.verify(token, Config.secretWord);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({ message: error.message });
  }
};
module.exports = {
  verifyTokenMiddleware,
};
