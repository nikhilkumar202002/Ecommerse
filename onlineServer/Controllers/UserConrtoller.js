const userModel = require('../Models/UserModel')
const HomepageData = (req,res)=>{
    let data={name:"anaz"}
    res.send(data);
}
const userRegistration = async (req,res)=>{
    console.log(req.body)
    try {
        await   userModel.create(req.body)
        console.log("Data inserted")
    } catch (error) {
        console.log(error) 
    }
    res.json(true)
}
module.exports = {HomepageData,userRegistration}
