const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_SECRET;

  //Check if there's an authorization
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }
  //Authorization ok, clean up token by removing 'Bearer'
  const token = authorization.replace("Bearer ", "");
  let payload;

  //Check if payload matches existing payload
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }

  //Set payload to req.user
  req.user = payload;

  //Call next middleware
  next();
};
