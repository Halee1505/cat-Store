const Model = require("../models/product.model");
class Product {
  index(req, res) {
    const sql =
      "SELECT * FROM product WHERE name LIKE '%" +
      (req.query.search ? req.query.search : "") +
      "%'" +
      " LIMIT ?,?";
    Model.productModel.query(
      sql,
      [Number(req.query.from), Number(req.query.to)],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  getProduct(req, res) {
    const sql = "SELECT * FROM product WHERE id = ?";
    Model.productModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getProductByCatalog(req, res) {
    const sql = "SELECT * FROM product WHERE catalog_id = ? LIMIT ?,?";
    Model.productModel.query(
      sql,
      [req.params.id, req.body.from, req.body.to],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  createProduct(req, res) {
    const sql =
      "INSERT INTO product SET catalog_id=?, name=?, price=?,discount=?,gender=?, description =?";
    Model.productModel.query(
      sql,
      [
        req.body.catalog_id,
        req.body.name,
        req.body.price,
        req.body.discount,
        req.body.gender,
        req.body.description,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updateProduct(req, res) {
    const sql =
      "UPDATE product SET catalog_id = ?, name = ?, price = ?, discount = ?, gender = ? , description =? WHERE id = ?";
    Model.productModel.query(
      sql,
      [
        req.body.catalog_id,
        req.body.name,
        req.body.price,
        req.body.discount,
        req.body.gender,
        req.body.description,
        req.params.id,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteProduct(req, res) {
    const sql = "DELETE FROM product WHERE id = ?";
    Model.productModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Product();
