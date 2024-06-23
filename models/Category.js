const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

categorySchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
