const Model = require("../models/messenger.model");
class Messenger {
  index(req, res) {
    const sql = "SELECT * FROM messenger";
    Model.messengerModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getUserMessenger(req, res) {
    const sql = "SELECT * FROM messenger WHERE user_id = ?";
    // "SELECT * FROM messenger WHERE user_id = ? ORDER BY id DESC LIMIT ?,?";
    Model.messengerModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }

  createMessenger(req, res) {
    const sql =
      "INSERT INTO messenger SET user_id = ?, from_id=?, to_id=?, message=?";
    Model.messengerModel.query(
      sql,
      [req.body.user_id, req.body.from_id, req.body.to_id, req.body.message],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteMessenger(req, res) {
    const sql = "DELETE FROM messenger WHERE user_id = ?";
    Model.messengerModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Messenger();
