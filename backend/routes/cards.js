const router = require("express").Router();
const {
  getAllCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

//Card Route definitions
router.get("/", getAllCards);
router.get("/:id", getCard);
router.post("/", createCard);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);
router.put("/:id/likes", likeCard);
router.delete("/:id/likes", dislikeCard);

module.exports = router;
