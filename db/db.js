const {mongo}= require("mongoose")
const mongoose = require("mongoose")

module.exports.connectToMongoDB = async () =>{
    mongoose.set("strictQuery",false)
    mongoose.connect("mongodb://localhost:27017/summercamp").then(
        ()=>{
            console.log("connect to db")
        } 
    ).catch(
        (err)=>{
            console.log(err)
        }
    )
}