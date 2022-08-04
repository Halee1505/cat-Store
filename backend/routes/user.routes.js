const express = require("express");
const router = express.Router();
const User = require("../controllers/user.controller");

router.get("/", User.index);
router.get("/:id", User.getUser);
router.post("/", User.createUser);
router.post("/login", User.login);
router.put("/:id", User.updateUser);
router.delete("/:id", User.deleteUser);

module.exports = router;
