const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./data/database");

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

app.use("/users", auth, userRouter);

app.use("/cards", auth, cardRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Server listening on PORT ${PORT}.</h1>`);
});

app.post("/signin", login);
app.post("/signup", createUser);

// Middleware to handle invalid routes
app.use((req, res, next) => {
  res.status(404).send("Error: Page not found");
});

app.listen(PORT, () => {
  console.log(`The app is listening on PORT ${PORT}`);
});
