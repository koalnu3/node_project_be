const Category = require("../models/Category");
const { response } = require("express");
const categoryController = {};

categoryController.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = new Class({
      name,
    });

    await newCategory.save();
    res.status(200).json({ status: "success", newClass });
  } catch (err) {
    res.status(400).json({ status: "fail", error: err.message });
  }
};

categoryController.getCategory = async (req, res) => {
  try {
    //   const { name, category } = req.query;

    const category = await Category.find();
    if (!category) throw new Error("Can't find category");

    let response = { status: "success" };
    response.data = category;

    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = categoryController;
