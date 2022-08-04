const Model = require("../models/size.model");
class Size {
  index(req, res) {
    const sql = "SELECT * FROM size";
    Model.sizeModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getSizeByProduct(req, res) {
    const sql = "SELECT * FROM size WHERE product_id = ?";
    Model.sizeModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createSize(req, res) {
    const sql =
      "INSERT INTO size SET product_id = ?, size = ?, color = ?,link_img = ?,count = ?";
    Model.sizeModel.query(
      sql,
      [
        req.body.product_id,
        req.body.size,
        req.body.color,
        req.body.link_img,
        req.body.count,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updateSize(req, res) {
    const sql =
      "UPDATE size SET product_id = ?, size = ?, color = ?,link_img = ?,count = ? WHERE id = ?";
    Model.sizeModel.query(
      sql,
      [
        req.body.product_id,
        req.body.size,
        req.body.color,
        req.body.link_img,
        req.body.count,
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
  deleteSize(req, res) {
    const sql = "DELETE FROM size WHERE id = ?";
    Model.sizeModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Size();
