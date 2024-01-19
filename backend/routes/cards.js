const router = require("express").Router();
const {celebrate, Joi, errors} = require('celebrate')

const {
  getAllCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const auth = require("../middleware/auth");

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
  

//Card Route definitions
router.get("/", getAllCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);
router.put("/:id/likes", likeCard);
router.delete("/:id/likes", dislikeCard);

module.exports = router;
