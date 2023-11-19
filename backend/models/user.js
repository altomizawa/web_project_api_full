const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

// Regular expression for validating the avatar URL
const avatarURLPattern =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=,-]+(#)?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: "Explorer",
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
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Custom synchronous validator using Validator.js
        return validator.isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email }).then((user) => {
    //Email not found in database, return error
    if (!user) {
      return Promise.reject(new Error("Incorrect email or password"));
    }
    //Email found! Compare passwords

    return bcrypt.compare(password, user.password).then((matched) => {
      //Passwords dont match, return error
      if (!matched) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      //passwords match, return user
      return user;
    });
  });
};

module.exports = mongoose.model("user", userSchema);
