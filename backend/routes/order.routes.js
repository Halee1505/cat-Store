const express = require("express");
const router = express.Router();
const Order = require("../controllers/order.controller");

router.get("/", Order.index);
router.get("/:id", Order.getOrder);
router.get("/bytransaction/:id", Order.getOrderByTransaction);
router.get("/byuser/:id", Order.getOrderByUser);
router.get("/detail/byuser/:id", Order.getOrderDetailByUser);
router.get("/detail/bytransaction/:id", Order.getOrderDetailByTransaction);
router.post("/", Order.createOrder);
router.put("/:id", Order.updateOrder);
router.put("/update-count/:id", Order.updateOrderCount);
router.put("/update-transaction/:id", Order.updateOrderTransaction);
router.delete("/:id", Order.deleteOrder);
router.delete("/bytransaction/:id", Order.deleteOrderByTransaction);

module.exports = router;
