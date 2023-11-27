const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateAvatar,
  getProfile,
} = require("../controllers/users");

//User Route definitions\
router.get("/", getAllUsers);
router.get("/me", getProfile);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/avatar", updateAvatar);

module.exports = router;
