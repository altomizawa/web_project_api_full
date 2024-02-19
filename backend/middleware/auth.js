const jwt = require("jsonwebtoken");
require("dotenv").config();

//import http status and response messages
const {HttpStatus, HttpResponseMessage} = require('../enums/http');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secretKey = process.env.JWT_SECRET;

  //Check if there's an authorization
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(HttpStatus.FORBIDDEN).send(HttpResponseMessage.FORBIDDEN);
  }
  //Authorization ok, clean up token by removing 'Bearer'
  const token = authorization.replace("Bearer ", "");

  let payload;

  //Check if payload matches existing payload
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return res.status(HttpStatus.FORBIDDEN).send(HttpResponseMessage.FORBIDDEN);
  }

  //Set payload to req.user
  req.user = payload;

  //Call next middleware
  next();
};
