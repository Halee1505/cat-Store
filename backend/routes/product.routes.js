const express = require("express");
const router = express.Router();
const Product = require("../controllers/product.controller");

router.get("/", Product.index);
router.get("/:id", Product.getProduct);
router.get("/bycatalog/:id", Product.getProductByCatalog);
router.post("/", Product.createProduct);
router.put("/:id", Product.updateProduct);
router.delete("/:id", Product.deleteProduct);

module.exports = router;
