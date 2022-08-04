const express = require("express");
const router = express.Router();
const Transaction = require("../controllers/transaction.controller");

router.get("/", Transaction.index);
router.get("/:id", Transaction.getTransaction);
router.get("/byuser/:id", Transaction.getTransactionByUser);
router.post("/", Transaction.createTransaction);
router.put("/:id", Transaction.updatePayment);
router.put("/status/:id", Transaction.updateStatus);
router.put("/info/:id", Transaction.updatePaymentInfo);
router.delete("/:id", Transaction.deleteTransaction);

module.exports = router;
