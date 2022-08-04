const Model = require("../models/wishlist.model");
class Wishlist {
  index(req, res) {
    const sql = "SELECT * FROM wishlist";
    Model.wishlistModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getWishlist(req, res) {
    const sql = "SELECT * FROM wishlist WHERE id = ?";
    Model.wishlistModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getWishlistByUser(req, res) {
    const sql = "SELECT * FROM wishlist WHERE user_id = ?";
    Model.wishlistModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createWishlist(req, res) {
    const sql = "INSERT INTO wishlist SET user_id = ?, product_id = ?";
    Model.wishlistModel.query(
      sql,
      [req.body.user_id, req.body.product_id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteWishlist(req, res) {
    const sql = "DELETE FROM wishlist WHERE product_id = ?";
    Model.wishlistModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Wishlist();
