// // const express = require("express");
// // const mongoose = require("mongoose");
// // const { Account } = require("./db");

// // const app = express();
// // const router = express.Router;

// // router.post("/send", (req, res) => {
// //   const transferFunds = async (fromAccountId, toAccountId, amount) => {
// //     await Account.findByIdAndUpdate(fromAccountId, {
// //       $inc: { balance: -amount },
// //     });

// //     await Account.findByIdAndUpdate(toAccountId, { $inc: { balance: amount } });
// //   };

// //   transferFunds("ayush@gmail.com", "krsna@gmail.com", 200);
// // });

// const express = require("express");
// const { authMiddleware } = require("../middleware");
// const { Account } = require("../db");
// const mongoose = require("mongoose");

// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//   const account = await Account.findOne({
//     userId: req.userId,
//   });
//   res.json({
//     balance: account.balance,
//   });

//   router.post("/transfer", authMiddleware, async (req, res) => {
//     const session = mongoose.startSession();

//     session.startTransaction();
//     const { amount, to } = req.body;

//     const account = Account.findOne({ userId: req.userId }).session(session);

//     if (!account || account.balance < amount) {
//       (await session).abortTransaction();
//       return res.status(400).json({
//         msg: "Insufficent balance",
//       });
//     }

//     Account.updateOne(
//       { userId: req.userId },
//       { $inc: { balance: amount } }
//     ).session(session);

//     Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(
//       session
//     );

//     session.commitTransaction();
//     res.json({
//       msg: "Transfer successful",
//     });
//   });
// });
// module.exports = router;
