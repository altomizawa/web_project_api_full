const mongoose = require("mongoose");

// Regular expression for validating the avatar URL
const avatarURLPattern =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=,-]+(#)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return avatarURLPattern.test(v);
      },
      message: "Invalid Avatar URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
