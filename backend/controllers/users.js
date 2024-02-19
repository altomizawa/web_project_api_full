require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const NotFoundError = require("../errors/not-found-error");
const AuthError = require('../errors/auth-error');
const requestError = require('../errors/request-error')

//import http status and response messages
const {HttpStatus, HttpResponseMessage} = require('../enums/http');

const User = require("../models/user");
const { restart } = require("nodemon");

//-----------LOGIN---------------
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  const secretKey = process.env.JWT_SECRET;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      //Create token for returned user
      const token = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: "7d",
      });
      res.send({ token: token });
    })
    .catch((err) => {
      next(new AuthError(err.message))
    });
};

//-----------GET MY USER PROFILE---------------
module.exports.getProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found in our Database');
      }
      const filteredUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        avatar: user.avatar,
      };

      res.send(filteredUser);
    })
    .catch(err => next(err));
};

//-----------GET ALL USERS---------------
module.exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
};

//-----------GET USER BY ID---------------
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new Error({message: 'User not found in our Database'})
      }
      res.send(user);
    })
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
};

//------------CREATE USER----------------
module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, about, avatar, email, password: hash })
      .then((user) => {
        res.send({ data: user });
      })
      .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
  });
};

//------------DELETE USER----------------
module.exports.deleteUser = (req, res) => {
  //Check if current user (req.user._id) matches target user
  if (req.user._id !== req.params.id) {
    return res.status(HttpStatus.UNAUTHORIZED).send({ message: HttpResponseMessage.UNAUTHORIZED });
  }
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
};

//-------------UPDATE USER--------------
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.params.id, { name, about }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
};

//-------------UPDATE AVATAR--------------
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.params.id, { avatar }, { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR });
    });
};
