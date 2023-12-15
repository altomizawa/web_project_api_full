const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");
const {celebrate, Joi, errors} = require('celebrate')
const validator = require('validator')
const { requestLogger, errorLogger } = require('./middleware/logger')

const { PORT = 4000, BASE_PATH } = process.env;
require("dotenv").config();


const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

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

//CREATE CARD VALIDATION
  //Custom URL validation
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value
  }
  return helpers.error('string.uri')
}

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(8).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
})

//REQUEST LOGGER MIDDLEWARE
app.use(requestLogger);

app.use("/users", auth, userRouter);

app.use("/cards", auth, createCardValidation, cardRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Server listening on PORT ${PORT}.</h1>`);
});
app.post("/signin", signupValidation, login);
app.post("/signup", signupValidation, createUser);

// Middleware to handle invalid routes
app.use((req, res, next) => {
  res.status(404).send("Error: Page not found");
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
