const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");
const {celebrate, Joi, errors} = require('celebrate')
const validator = require('validator')
const { requestLogger, errorLogger } = require('./middleware/logger')
const cors = require('cors')

//import Object Freeze http
const {HttpStatus, HttpResponseMessage} = require('./enums/http')

const { PORT = 4000, BASE_PATH } = process.env;
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

// //Add CORS middleware
// const corsMiddleware = require('./middleware/cors')
// app.use(corsMiddleware);

// app.options('*', cors()); //make all routes available

const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'https://discoverus.fairuse.org',
  'http://discoverus.fairuse.org',
  'http://www.discoverus.fairuse.org',
  'https://www.discoverus.fairuse.org'
];

app.use(function(req, res, next){
  const {origin} = req.headers;

  if(allowedCors.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
})

connectDatabase();

const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");
const { configDotenv } = require("dotenv");
const { getProfile } = require("./controllers/users");

//CELEBRATE + JOI validation middleware
//SIGN UP AND SIGN IN VALIDATION
const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(8).max(30),
    password: Joi.string().required().min(5),
  }),
});


//REQUEST LOGGER MIDDLEWARE
app.use(requestLogger);

app.use("/users", auth, userRouter);
app.use("/cards", auth, cardRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Server listening on PORT ${PORT}.</h1>`);
});

//remove code below after revision
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

app.post("/signin", signupValidation, login);
app.post("/signup", signupValidation, createUser);

// Middleware to handle invalid routes
app.use((req, res, next) => {
  return res.status(HttpStatus.NOT_FOUND).send(HttpResponseMessage.N);
});

//ERROR LOGGER MIDDLEWARE
app.use(errorLogger);

//middleware to handle CELEBRATE Errors only
app.use(errors());

//middleware to handle ALL errors
app.use((err, req, res, next) => {
  //destructuring err and set statusCode default to 500 is not present
  const {statusCode = 500, message } = err;
  res.status(statusCode)
  .send({
    message: statusCode===500 ? 'There was a server error' : message
  });
});

app.listen(PORT, () => {
  console.log(`The app is listening on PORT ${PORT}`);
});