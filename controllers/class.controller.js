const Class = require("../models/Class");
const { response } = require("express")
const PAGE_SIZE=8;
const classController = {};

classController.createClass = async (req,res) =>{
  try {
      const { 
          id, name, description, image, curriculum, price, notice, category, userId, status 
      } = req.body
  
      
      const newClass = new Class({
          id, name, description, image, curriculum, price, notice, category, userId, status
      })
  
      await newClass.save()
      res.status(200).json({ status: "success", newClass })
    } catch (err) {
      res.status(400).json({ status: "fail", error: err.message })
    }
}

classController.getClass = async (req, res) => {
    try {
      const { page, name, category } = req.query;
      let response = { status: "success" };
  
      // 조건문 작성
      const cond = {
        ...(name && { name: { $regex: name, $options: "i" } }),
        ...(category && { category: { $in: [category] } }),
      };

      //
      const query = Class.find(cond)
        .skip((page - 1) * PAGE_SIZE)
        .limit(PAGE_SIZE);
  
      const totalItemNum = await Class.countDocuments(cond);
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
  
      const classList = await query.exec();
  
      response = {
        ...response,
        totalPageNum,
        data: classList,
      };  
      res.status(200).json(response);
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };

  classController.updateClass = async (req, res) => {
    try {
      const classId = req.params.id;
      const updateData = req.body;
  
      const updatedClass = await Class.findByIdAndUpdate(classId, updateData, { new: true });
      if (!updatedClass) throw new Error("No item found");
  
      res.status(200).json({ status: "success", updatedClass });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
  };

classController.deleteClass = async (req, res) => {
  try {
      const classId = req.params.id;
      const targetClass = await Class.findByIdAndUpdate(
        { _id: classId },
        { isDeleted: true }
      );
      if (!targetClass) throw new Error("No item found");
      res.status(200).json({ status: "success" });
    } catch (error) {
      return res.status(400).json({ status: "fail", error: error.message });
    }
};

classController.getClassById = async (req, res) => {
  try {
    const classId = req.params.id;
    const targetClass = await Class.findById(classId);
    if (!targetClass) throw new Error("No item found");

    res.status(200).json({ status: "success", data: targetClass });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
};

module.exports = classController;