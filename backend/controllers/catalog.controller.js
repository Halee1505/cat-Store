const Model = require("../models/catalog.model");
class Catalog {
  index(req, res) {
    const sql = "SELECT * FROM catalog";
    Model.catalogModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getCatalog(req, res) {
    const sql = "SELECT * FROM catalog WHERE id = ?";
    Model.catalogModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createCatalog(req, res) {
    const sql = "INSERT INTO catalog SET name=?";
    Model.catalogModel.query(sql, [req.body.name], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  updateCatalog(req, res) {
    const sql = "UPDATE catalog SET name = ? WHERE id = ?";
    Model.catalogModel.query(
      sql,
      [req.body.name, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteCatalog(req, res) {
    const sql = "DELETE FROM catalog WHERE id = ?";
    Model.catalogModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Catalog();
