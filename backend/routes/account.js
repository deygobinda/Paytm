const express = require("express");
const router = express.Router();
const middleware = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

router.get("/balance", middleware, async (req, res) => {
  const user = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: user.balance,
  });
});

router.post("/transfer", middleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body; 
  try {
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );
    if (!account || account.balance < amount) {
      
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session); 
    
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session); 

    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "An error occurred during the transfer",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

module.exports = router;
