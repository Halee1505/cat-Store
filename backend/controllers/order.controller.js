const Model = require("../models/order.model");
class Order {
  index(req, res) {
    const sql = "SELECT * FROM orders";
    Model.orderModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getOrder(req, res) {
    const sql = "SELECT * FROM orders WHERE id = ?";
    Model.orderModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getOrderByUser(req, res) {
    const sql = "SELECT * FROM orders WHERE user_id = ?";
    Model.orderModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  getOrderByTransaction(req, res) {
    const sql = "SELECT * FROM orders WHERE transaction_id = ?";
    Model.orderModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }

  getOrderDetailByUser(req, res) {
    const sql =
      "SELECT orders.id , orders.qty,  orders.amount,orders.transaction_id, orders.status, product.id as product_id,  product.name,  product.price,  product.gender,  size.size,  size.color,  size.link_img,  size.count FROM orders JOIN product ON orders.product_id = product.id JOIN size ON orders.classify_id = size.id WHERE orders.user_id = " +
      req.params.id;
    Model.orderModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }

  getOrderDetailByTransaction(req, res) {
    const sql =
      "SELECT orders.id , orders.qty,  orders.amount,orders.transaction_id, orders.status,  product.name,  product.price,  product.gender,  size.size,  size.color,  size.link_img,  size.count FROM orders JOIN product ON orders.product_id = product.id JOIN size ON orders.classify_id = size.id WHERE orders.transaction_id = " +
      req.params.id;
    Model.orderModel.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  // id ,user_id	,product_id	,classify_id,qty,amount,transaction_id,status
  createOrder(req, res) {
    const sql =
      "INSERT INTO orders SET user_id = ?, product_id = ?, classify_id=? ,qty = ?, amount =? ,transaction_id = ?, status = ?";
    Model.orderModel.query(
      sql,
      [
        req.body.user_id,
        req.body.product_id,
        req.body.classify_id,
        req.body.qty,
        req.body.amount,
        req.body.transaction_id,
        req.body.status,
      ],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }
  updateOrderCount(req, res) {
    const sql = "UPDATE orders SET qty = ?, amount = ? WHERE id = ?";
    Model.orderModel.query(
      sql,
      [req.body.qty, req.body.amount, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }

  updateOrderTransaction(req, res) {
    const sql = "UPDATE orders SET transaction_id = ?, status = ? WHERE id = ?";
    Model.orderModel.query(
      sql,
      [req.body.transaction_id, req.body.status, req.params.id],
      (err, result) => {
        if (err) {
          throw err;
        }
        res.send(result);
      }
    );
  }

  updateOrderStatus(req, res) {
    const sql = "UPDATE orders SET status = ? WHERE id = ?";
    Model.orderModel.query(
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
  updateOrder(req, res) {
    const sql =
      "UPDATE orders SET qty = ?, amount = ?, data=? , status=? WHERE id = ?";
    Model.orderModel.query(
      sql,
      [
        req.body.qty,
        req.body.amount,
        req.body.data,
        req.body.status,
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
  deleteOrder(req, res) {
    const sql = "DELETE FROM orders WHERE id = ?";
    Model.orderModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
  deleteOrderByTransaction(req, res) {
    const sql = "DELETE FROM orders WHERE transaction_id = ?";
    Model.orderModel.query(sql, [req.params.id], (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  }
}

module.exports = new Order();
