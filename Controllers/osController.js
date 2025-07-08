const os=require("os");
module.exports.getOsInformation = async(req,res)=>{
    try{
        const osInformation = {
               hostname : os.hostname(),
               type : os.type(),
               platform : os.platform()
        }
        if(!osInformation){
            throw new Error("there is no information")
        }
        res.status(200).json(osInformation)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}
//just bch ywaryk kifh te5ou data by id 
module.exports.osCpusById = async(req,res)=>{
    try{
        const {id} = req.params; //http://localhost:5000/os/cpus/123
        const {idd} = req.body; //http://localhost:5000/os/cpus=body{123}
        const {iddd} =req.query ;//http://localhost:5000/os/cpus?iddd=123
        //const osCpus = os.cpus();
        res.status(200).json(id,idd,iddd)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}