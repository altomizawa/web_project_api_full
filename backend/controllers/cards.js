const router = require("express").Router();

const Card = require("../models/card");

//-----------GET ALL CARDS---------------
module.exports.getAllCards = (req, res) => {
  Card.find()
    .sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//------------CREATE CARD----------------
module.exports.createCard = (req, res) => {
  const { name, link, likes, createdAt } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner, likes, createdAt })
    .then((card) => res.send(card))
    .catch((err) => {
      const ERROR_CODE = 400;
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE).send({ message: "Invalid data input" });
      } else {
        res.status(500).send({ message: "Error" });
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
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" })
    );
};

//------------DELETE CARD----------------
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(404)
    .then((card) => res.send(card))
    .catch((err) =>
      res
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" })
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
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" });
    });
};

//-------------LIKE CARD--------------
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" });
    });
};

//-------------DISLIKE CARD--------------
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      res
        .status(err.statusCode || 500)
        .send({ message: err.message || "Error" });
    });
};
