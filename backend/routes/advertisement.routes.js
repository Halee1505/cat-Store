const express = require("express");
const router = express.Router();
const Advertisement = require("../controllers/advertisement.controller");

router.get("/", Advertisement.index);
router.put("/:id", Advertisement.updateAdvertisement);

module.exports = router;
