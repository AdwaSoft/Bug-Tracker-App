import  express  from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bugModel = new Schema({
    bugId:{type:String,required:true},
    bugTittle:{type:String,required:true},
    bugDescription:{type:String,required:true},
    createdTime:{type:String,required:true},
    createdDate:{type:String,required:true},
    bugAssignee:{type:String,required:true},
    isResolved :{type:Boolean,default:false}
},{timestamps:true})

export default  mongoose.model('bugs',bugModel);