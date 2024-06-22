const mongoose = require("mongoose");
const User = require("./User");
const Class = require("./Class");
const Schema = mongoose.Schema;
const orderSchema = Schema(
  {
    orderNum: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: User,
    },
    classId: {
      type: mongoose.ObjectId,
      ref: Class,
    },
    price: {
      type: Number,
      required: true,
    },
    payMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "payment",
    },
  },
  { timestamps: true }
);
orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updatedAt;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
