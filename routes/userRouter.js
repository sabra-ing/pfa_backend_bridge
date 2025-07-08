var express = require('express');
var router = express.Router();
const userController=require("../Controllers/userController")
//const uploadfile=require("../middlewares/uploadFileMiddlewares")

/* GET users listing. */
router.get('/getAllUsers',userController.getAllUsers);
router.get('/getUserById/:id',userController.getUserById);
router.get("/getUserByEmail",userController.getUserByEmail); //hethy get mouch post !!!


router.post('/addLearner',userController.addLearner);
router.post('/addAdmin',userController.addAdmin);
router.post('/addTeacher',userController.addTeacher);
//router.post("/addClientWithImg",uploadfile.single("image_User"),userController.addClientWithImg);

router.put('/updateUser/:id',userController.updateUserById);
router.put('/updatePassword/:id',userController.updatePasswordById);

router.delete('/deleteUserById/:id',userController.deleteUserById);

module.exports = router; // pour exporter le router dans le fichier app.js
