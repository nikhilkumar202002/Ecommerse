const express = require('express')
const a = require('./Controllers/UserConrtoller')
const UserRoute = require('./Routs/UserRoutes')
const connect =  require('./Config/Config')
const cors = require("cors")


const app = express()
const port = 3000

app.use(cors());

app.use(express.json());

async function connection(){
    try {
            await connect();
        console.log("Db Connected")
    } catch (error) {
        console.log(error)  
    }
}
connection();
app.use('/',UserRoute)

app.listen(port,function(){
    console.log("Server started",port)
})