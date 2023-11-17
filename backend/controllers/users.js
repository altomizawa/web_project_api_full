const router = require("express").Router();

const User = require("../models/user");

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
      res.send({ data: user });
    })
    .catch((err) => res.status(500).send({ message: "Error" }));
};

//------------CREATE USER----------------
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: "Error" }));
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
// module.exports = router;
