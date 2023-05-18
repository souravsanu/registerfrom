const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmaill(value)) {
        throw new Error("Not valid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

//hash password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//creating model
const users = new mongoose.model("users", userSchema);

module.exports = users;
