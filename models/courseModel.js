const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    title: {type:String,require:true},
    price: Number,
    //live course
    sessionLink:String,
    //recorded course
    videoURL:String,
    platform:String,
    typeCourse : {type: String,
        enum : ['recordedCourse','liveCourse']

    },
    teacherId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    paymentOne : {type:mongoose.Schema.Types.ObjectId,ref:"Payment"}
    

},{timestamps:true})

const Course = mongoose.model("Course",courseSchema) // creation du model ml schema
module.exports = Course