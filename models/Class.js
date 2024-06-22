const mongoose = require('mongoose')
const User = require("./User");
const Category = require("./Category");
const Schema = mongoose.Schema;
const classSchema = Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true     
    },
    description: {
        type:String,
        required:true     
    },
    image: {
        type:Array,
        required:true     
    },
    curriculum: {
        type:Array,
        required:true     
    },    
    price: {
        type:Number,
        required:true     
    },
    notice: {
        type:String,
        required:true     
    },
    category: {
        type:String,
        required:true
    },
    userId: { 
        type: mongoose.ObjectId, 
        ref: User
    },
    status: {
        type:String,
        default:'request'     
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps:true})

classSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}
const Class = mongoose.model('Class', classSchema)
module.exports = Class;