// l file eli bch tamlou upload yhothoulk toul sywe image ,cv ...

const multer=require("multer"); //biblio resonsable al copier coller l ay file
const path=require("path");
const fs = require('fs');

var storage=multer.diskStorage({ //diskstorage mantha bch ysajel
    destination:function(req,file,cb){
        cb(null,'public/images/Users') //distinaation de l image
},
filename:function(req,file,cb){
    const uploadPath='public/images/Users'; //lblas de l image
    const originalName =file.originalname; //l esm l'original du file
    console.log(file.originalname) 
    const fileExtension=path.extname(originalName); //extension mt3 l file
    let fileName = originalName;
    //verifier si le fichier existe deja
    let fileIndex =1;
    while(fs.existsSync(path.join(uploadPath,fileName))){
        const baseName =path.basename(originalName,fileExtension);
        fileName=`${baseName}_${fileIndex}${fileExtension}`;
        fileIndex++;
    }
    cb(null,fileName);
}
})

var uploadfile=multer({storage:storage});
module.exports=uploadfile;