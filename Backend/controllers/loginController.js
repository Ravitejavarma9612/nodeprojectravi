const {UserDB} = require('../Data/data');
const fspromise = require("fs").promises;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const createUser = async (req,res)=>{
    console.log(UserDB.Users);
    if(!req.body || !req.body.username || !req.body.password) return res.status(400).send("Username or password is missing");
    let isduplicate = UserDB.Users.some((data)=>{
       return data.username == req.body.username;
    });
    if(isduplicate){
        res.status(409).send("User already exists");
    }else{
        const username = req.body.username;
        const password = await bcrypt.hash(req.body.password,10);
        try{
        if(!fs.existsSync(path.join(__dirname,"..","Data"))){
            await fspromise.mkdir(path.join(__dirname,"..","Data"));
        }
        const otherusers = UserDB.Users.filter((data)=>{
            return data.username != req.body.username;
         });
        UserDB.setUser([...otherusers,{username,password}]);
        await fspromise.writeFile(path.join(__dirname,"..","Data","Users.json"),JSON.stringify(UserDB.Users));
        console.log(UserDB.Users);
        res.status(201).send(`User ${username} is created`);
        }catch(e){
            console.error(e.message);
        }
    }
};

// return array of objects of user credentrials
const getUser = (req,res)=>{
    if(!req.params.username) res.status(400).send("invalid request!!");
    const user = req.params.username;
    const foundUser = UserDB.Users.filter((d)=>{
        return d.username == user;
    });

    (foundUser.length>0) ? res.status(200).send(foundUser) : res.status(200).send("No user found");
}



module.exports = {createUser,getUser};