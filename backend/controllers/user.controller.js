const Model = require("../models/user.model");
class User {
  index(req, res) {
    const sql = "SELECT * FROM user";
    Model.userModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getUser(req, res) {
    const sql = "SELECT * FROM user WHERE id = ?";
    Model.userModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createUser(req, res) {
    const sql = "INSERT INTO user SET email = ?, password = ?";
    Model.userModel.query(
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
  updateUser(req, res) {
    const sql =
      "UPDATE user SET name = ?, phone = ? , address = ?, avatar = ? WHERE id = ?";
    Model.userModel.query(
      sql,
      [
        req.body.name,
        req.body.phone,
        req.body.address,
        req.body.avatar,
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
  login(req, res) {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    Model.userModel.query(
      sql,
      [req.body.email, req.body.password],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result[0]);
      }
    );
  }
  deleteUser(req, res) {
    const sql = "DELETE FROM user WHERE id = ?";
    Model.userModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new User();
