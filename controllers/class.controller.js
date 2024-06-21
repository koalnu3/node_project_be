const Class = require("../models/Class");

const PAGE_SIZE=8;
const classController = {};

classController.createClass = async (req,res) =>{
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
}

classController.deleteClass = async (req, res) => {
};

classController.getClassById = async (req, res) => {
};

module.exports = classController;