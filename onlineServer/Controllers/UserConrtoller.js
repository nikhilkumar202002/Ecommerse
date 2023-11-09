const userModel = require('../Models/UserModel')
const bcrypt = require('bcryptjs'); 

const HomepageData = (req,res)=>{
    let data={name:"anaz"}
    res.send(data);
}
const userRegistration = async (req,res)=>{
    console.log(req.body)
    try {
        const {Password}  =  req.body
        bcrypt.hash(Password,10,  async function(err,hash){
            if(err){
                console.log(err)

            }else{
                req.body.Password = hash;
                console.log(hash)
                await  userModel.create(req.body)
                console.log("Data inserted")
            }
        })
        
    } catch (error) {
        console.log(error) 
    }
    res.json(true)
}

const userLogin = async (req,res)=>{
    console.log(req,res)
    const { Email } = req.body;
    const   pass = req.body.Password;
        try {
            let user = await userModel.findOne({Email:Email})
            console.log(user)
            let Password =user.Password;
            let compare = await bcrypt.compare(pass,Password)
            console.log(compare)
            if(compare){
                res.json(user)
            }else{
                console.log(false)
            }     
        } catch (error) {
            console.log(error)
        }
}
module.exports = {HomepageData,userRegistration,userLogin}
