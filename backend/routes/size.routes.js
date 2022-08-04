const express = require("express");
const router = express.Router();
const Size = require("../controllers/size.controller");

router.get("/", Size.index);
router.get("/:id", Size.getSizeByProduct);
router.post("/", Size.createSize);
router.put("/:id", Size.updateSize);
router.delete("/:id", Size.deleteSize);

module.exports = router;
