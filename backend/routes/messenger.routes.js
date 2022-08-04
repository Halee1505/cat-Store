const express = require("express");
const router = express.Router();
const Messenger = require("../controllers/messenger.controller");

router.get("/", Messenger.index);
router.get("/:id", Messenger.getUserMessenger);
router.post("/", Messenger.createMessenger);
router.delete("/:id", Messenger.deleteMessenger);

module.exports = router;
