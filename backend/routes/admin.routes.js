const express = require("express");
const router = express.Router();
const Admin = require("../controllers/admin.controller");

router.get("/", Admin.index);
router.get("/:id", Admin.getAdmin);
router.post("/", Admin.createAdmin);
router.put("/:id", Admin.updateAdmin);
router.delete("/:id", Admin.deleteAdmin);

module.exports = router;
