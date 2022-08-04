const Model = require("../models/transaction.model");
class Transaction {
  index(req, res) {
    const sql = "SELECT * FROM transaction";
    Model.transactionModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getTransaction(req, res) {
    const sql = "SELECT * FROM transaction WHERE id = ?";
    Model.transactionModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getTransactionByUser(req, res) {
    const sql = "SELECT * FROM transaction WHERE user_id = ?";
    Model.transactionModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  createTransaction(req, res) {
    const sql =
      "INSERT INTO transaction SET status = ?, user_id = ?, user_name = ?, user_email=? , user_phone=?,user_address = ?, amount =? ,payment=?, payment_info=?, message=?, security=?";
    Model.transactionModel.query(
      sql,
      [
        req.body.status,
        req.body.user_id,
        req.body.user_name,
        req.body.user_email,
        req.body.user_phone,
        req.body.user_address,
        req.body.amount,
        req.body.payment,
        req.body.payment_info,
        req.body.message,
        req.body.security,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updatePayment(req, res) {
    const sql = "UPDATE transaction SET payment = ? WHERE id = ?";
    Model.transactionModel.query(
      sql,
      [req.body.payment, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updateStatus(req, res) {
    const sql = "UPDATE transaction SET status = ? WHERE id = ?";
    Model.transactionModel.query(
      sql,
      [req.body.status, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updatePaymentInfo(req, res) {
    const sql = "UPDATE transaction SET payment_info = ? WHERE id = ?";
    Model.transactionModel.query(
      sql,
      [req.body.payment_info, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  deleteTransaction(req, res) {
    const sql = "DELETE FROM transaction WHERE id = ?";
    Model.transactionModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Transaction();
