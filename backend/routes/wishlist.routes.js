const express = require("express");
const router = express.Router();
const Wishlist = require("../controllers/wishlist.controller");

router.get("/", Wishlist.index);
router.get("/:id", Wishlist.getWishlist);
router.get("/byuser/:id", Wishlist.getWishlistByUser);
router.post("/", Wishlist.createWishlist);
router.delete("/:id", Wishlist.deleteWishlist);

module.exports = router;
