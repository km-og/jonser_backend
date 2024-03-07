const jwt = require("jsonwebtoken");
const UnauthErr = require("../errors/UnauthErr");
const { SECRET_STRING } = require("../utils/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthErr("Необходима авторизация"));
  } else {
    const tokenFromHeaders = authorization.replace("Bearer ", "");
    let payload;
    try {
      payload = jwt.verify(tokenFromHeaders, SECRET_STRING);
      console.log(payload);
    } catch (err) {
      return next(new UnauthErr("Необходима авторизация"));
    }

    req.user = payload;
    console.log("успешная авторизация");

    next();
  }
};
