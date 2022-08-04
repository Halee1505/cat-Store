const Model = require("../models/admin.model");
class Admin {
  index(req, res) {
    const sql = "SELECT * FROM admin";
    Model.adminModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getAdmin(req, res) {
    const sql = "SELECT * FROM admin WHERE id = ?";
    Model.adminModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createAdmin(req, res) {
    const sql = "INSERT INTO admin SET email = ?, password = ?";
    Model.adminModel.query(
      sql,
      [req.body.email, req.body.password],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updateAdmin(req, res) {
    const sql = "UPDATE admin SET name = ?, password = ? WHERE id = ?";
    Model.adminModel.query(
      sql,
      [req.body.name, req.body.password, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteAdmin(req, res) {
    const sql = "DELETE FROM admin WHERE id = ?";
    Model.adminModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Admin();
