const express = require("express");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, to } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  });

  if (account.balance < amount) {
    return res.json({
      msg: "Insufficent balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  });

  if (!toAccount) {
    return res.json({
      msg: "Invalid account",
    });
  }

  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  );

  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  );

  res.json({
    msg: "Transfer successful",
  });
});

module.exports = router;
