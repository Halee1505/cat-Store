const express = require("express");
const router = express.Router();
const Catalog = require("../controllers/catalog.controller");

router.get("/", Catalog.index);
router.get("/:id", Catalog.getCatalog);
router.post("/", Catalog.createCatalog);
router.put("/:id", Catalog.updateCatalog);
router.delete("/:id", Catalog.deleteCatalog);

module.exports = router;
