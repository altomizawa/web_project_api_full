const router = require("express").Router();
const Card = require("../models/card");

//import http status and response messages
const {HttpStatus, HttpResponseMessage} = require('../enums/http');


//-----------GET ALL CARDS---------------
module.exports.getAllCards = (req, res) => {
  Card.find()
    .sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch((err) => res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR }));
};



//------------CREATE CARD----------------
module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;


  Card.create({ name, link, owner: owner, likes, createdAt })
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({ message: "Invalid data input" });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: HttpResponseMessage.INTERNAL_SERVER_ERROR });
      }
    });
};

//-----------GET CARD BY ID---------------
module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .orFail(404) //if card is not found, throw error
    .then((card) => res.send(card))
    .catch((err) =>
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR })
    );
};

//------------DELETE CARD----------------
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(404)
    .then((card) => res.send(card))
    .catch((err) =>
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR })
    );
};

//-------------UPDATE CARD--------------
module.exports.updateCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  Card.findByIdAndUpdate(req.user.id, { name, link, owner, likes, createdAt })
    .orFail(404)
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR });
    });
};

//-------------LIKE CARD--------------
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR });
    });
};

//-------------DISLIKE CARD--------------
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: err.message || HttpResponseMessage.INTERNAL_SERVER_ERROR });
    });
};
