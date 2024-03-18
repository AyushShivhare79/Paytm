const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://ayushshivhare1003:ZdF8qehyE1mBQOO8@cluster0.qve4rac.mongodb.net/PaytmTryAgain"
);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});

const accountsTable = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountsTable);
const User = mongoose.model("User", userSchema);

module.exports = {
  Account,
  User,
};
