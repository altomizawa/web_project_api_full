require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { restart } = require("nodemon");

//-----------LOGIN---------------
module.exports.login = (req, res) => {
  const { email, password } = req.body;
  const secretKey = process.env.JWT_SECRET;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      //Create token for returned user
      const token = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: "7d",
      });
      console.log(token);
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

//-----------GET MY USER PROFILE---------------
module.exports.getProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        console.log("error");
      }
      const filtereduser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      };

      res.send({ data: filtereduser });
    })
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//-----------GET ALL USERS---------------
module.exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//-----------GET USER BY ID---------------
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(400).send({ message: "User not found!" });
      }
      res.send({ data: user._id });
    })
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//------------CREATE USER----------------
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => res.status(500).send({ message: "Error" }));
  });
};

//------------DELETE USER----------------
module.exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//-------------UPDATE USER--------------
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//-------------UPDATE AVATAR--------------
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" });
    });
};
