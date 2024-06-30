const mongoose = require("mongoose");
const User = require("./User");
const Category = require("./Category");
const Schema = mongoose.Schema;

const subItemSchema = new Schema({
  title: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: false,
  },
});

const curriculumItemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subItems: [subItemSchema],
});

const classSchema = Schema(
  {
    id: {
      type: String,
      required: false,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    curriculum: {
      type: [curriculumItemSchema],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    notice: {
      type: String,
      required: false,
    },
    categoryId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: User,
    },
    // status: {
    //   type: String,
    //   default: "request",
    // },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

classSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  delete obj.updateAt;
  delete obj.createAt;
  return obj;
};
const Class = mongoose.model("Class", classSchema);
module.exports = Class;
