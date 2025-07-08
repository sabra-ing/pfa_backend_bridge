const userModel=require('../models/userModel')
const bcrypt=require('bcrypt') // lel hashage mt3 password
const Payment=require('../models/paymentModel')
module.exports.getAllUsers= async (req,res)=>{
    try {
        const userList = await userModel.find().sort("age") //sort() bch tnadhme haseb l age ASC tnjm tna7eha  
        //const userList = await userModel.find().sort({age:-1}) //sort() bch tnadhme haseb l age DESC 
        //const userList = await userModel.find({age:20}).limit(2) //find() bch tnadhme haseb l age 20 w limit 2 clients khw
        if(userList.length==0){
            throw new Error("users not found!");
        }
        res.status(200).json(userList)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}
module.exports.addLearner= async (req,res)=>{
    //m famch héritage fl monogo db 5aterha base noSQL donc namlou bl role kima haka
    try {
        const {name,email,password,preferredLanguages}=req.body
        const roleClient="learner"
        const user = new userModel({
            name,email,password,preferredLanguages,role:roleClient
        })
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.addLearnerWithPayment= async (req,res)=>{
    //m famch héritage fl monogo db 5aterha base noSQL donc namlou bl role kima haka
    try {
        const {name,email,password,preferredLanguages,paymentId}=req.body
        const roleClient="learner"
        const user = new userModel({
            name,email,password,preferredLanguages,role:roleClient,paymentsId:paymentId
        })
        await user.save()
        //bch tbadel fl table lo5ra
        await Payment.findByIdAndUpdate(paymentId,{$set:{learnerId:''}});
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.addTeacher= async (req,res)=>{
    try {
        const {name,email,password,languages,availability,courseId}=req.body
        const roleClient="teacher"
        const user = new userModel({
            name,email,password,languages,availability,role:roleClient,courseId
        })
        await user.save()
        await Course.findByIdAndUpdate(courseId,{$set:{teacherId:''}});

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}
module.exports.addAdmin= async (req,res)=>{
    try {
        const {name,email,password}=req.body
        const roleClient="admin"
        const user = new userModel({
            name,email,password,role:roleClient
        })
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.getUserById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const user = await userModel.findById(id)
        if(!user){
            throw new Error("user  not found!");
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.getUserByEmail = async (req,res)=>{
    try {
        const {email} = req.body
        const user = await userModel.find({email:email })
        
        if(! user){
            throw new Error("User not found");            
        }

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports.deleteUserById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const user = await userModel.findOneAndDelete(id)
        if(!user){
            throw new Error("user  not found!");
        }
        res.status(200).json("deleted")
    } catch (error) {
        res.status(500).json ({message: error.message}) }
}

module.exports.updateUserById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const {name,age}=req.body
        const user = await userModel.findById(id)

        if(!user){
            throw new Error("user  not found!");
        }
        const updated= await userModel.findByIdAndUpdate(
            id,
            {
                $set:{name,age}
            }
        )
        //m habch yaml update!!!
        res.status(200).json(updated)
    } catch (error){
        res.status(500).json ({message: error.message}) }
}

module.exports.updatePasswordById= async (req,res)=>{
    try {
        const {id}=req.params //nestamlou param bch n3adyw id w body bch n3adyw barcha data
        const {newPassword}=req.body
        const user = await userModel.findById(id)

        if(!user){
            throw new Error("user  not found!");
        }
    
        //hashage mt3 password jdid
        const salt = await bcrypt.genSalt();
        newpasswordhashed= await bcrypt.hash(newPassword,salt)
         //bch ncomparyw ken password jdid houwa nafsou l 9dim wla le 
        const samePassword = await bcrypt.compare(newPassword,user.password)

        if(samePassword){
            throw new Error(" error same password");
        }
        //update lel password
        const updated= await userModel.findByIdAndUpdate(
            id,
            {
                $set:{password: newpasswordhashed}
            }
        )
        //m habch yaml update!!!
        res.status(200).json(updated)
    } catch (error){
        res.status(500).json ({message: error.message}) }
}

/* module.exports.addClientWithImg = async (req,res)=>{
    try {
        const UserData = { ...req.body ,} // mantha bch te5ou les attributs lkool zli fl user model

        UserData.role = "client"
        
        if(req.file){
            const {filename} = req.file;
            UserData.image_User = filename
        }
        const user = new userModel(
            UserData
        )
        const userAdded = await user.save()
        res.status(200).json(userAdded)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}*/