const courseModel = require('../models/courseModel')
const Payment = require('../models/paymentModel')
const User=require('../models/userModel');

module.exports.getAllCourses= async (req,res)=>{
    try {
        const coursesList = await courseModel.find() //sort() bch tnadhme haseb l age ASC tnjm tna7eha  
        //const userList = await userModel.find().sort({age:-1}) //sort() bch tnadhme haseb l age DESC 
        //const userList = await userModel.find({age:20}).limit(2) //find() bch tnadhme haseb l age 20 w limit 2 clients khw
        if(coursesList.length==0){
            throw new Error("courses not found!");
        }
        res.status(200).json(coursesList)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}
module.exports.addRecordedCourse= async (req,res)=>{
    try {
        const {title,price,videoURL}=req.body
        const courseType="recordedCourse"
        const Course = new courseModel({
            title,price,videoURL,typeCourse:courseType
        })
         const addedCourse= await Course.save()

        res.status(200).json(addedCourse)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}
module.exports.addRecordedCourseWithPayment= async (req,res)=>{
    try {
        const {title,price,videoURL,paymentId,teacherId}=req.body
        const courseType="recordedCourse"
        const Course = new courseModel({
            title,price,videoURL,typeCourse:courseType,paymentId:paymentOne
        })
        await Course.save()
        await  Payment.findByIdAndUpdate(paymentId,{$set:{courseId:''}});
        res.status(200).json(Course)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.addLiveCourse= async (req,res)=>{
    try {
        const {title,price}=req.body
        const courseType="liveCourse"
        const Course = new userModel({
            title,price,typeCourse:courseType
        })
        const courseAdded = await Course.save()
        res.status(200).json(courseAdded)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}
module.exports.addLiveCourseWithPayment= async (req,res)=>{
    try {
        const {title,price}=req.body
        const courseType="liveCourse"
        const Course = new userModel({
            title,price,typeCourse:courseType
        })
     await Course.save()
    await  Payment.findByIdAndUpdate(paymentId,{$set:{courseId:''}});        res.status(200).json(courseAdded)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.getCourseById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const Course = await courseModel.findById(id)
        if(!Course){
            throw new Error("course  not found!");
        }
        res.status(200).json(Course)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.getCourseByTitle = async (req,res)=>{
    try {
        const {title} = req.body
        const course = await courseModel.find({title:title })
        
        if(! course){
            throw new Error("course not found");            
        }

        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.deleteCourseById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const Course = await courseModel.findOneAndDelete(id)
        if(!Course){
            throw new Error("course not found!");
        }
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.updateCourseById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const {title,price}=req.body
        const course = await courseModel.findById(id)

        if(!course){
            throw new Error("course  not found!");
        }
        const updated= await courseModel.findByIdAndUpdate(
            id,
            {
                $set:{title,price}
            }
        )
        //m habch yaml update!!!
        res.status(200).json(updated)
    } catch (error){
        res.status(500).json ({message: error.message}) }
}

