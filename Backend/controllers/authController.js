const {UserDB} = require('../Data/data');
const bcrypt = require("bcrypt");
let  usersd = require("../Data/Users.json");
let jwt = require("jsonwebtoken");
const path = require("path");
const fspromise = require("fs").promises;
require("dotenv").config();
const handleLogin = async (req,res)=>{
    if(!req.body || !req.body.username || !req.body.password) return res.status(400).send("Username or password is missing");
    const foundUser = usersd.filter((d)=>{
        console.log(d.username);
       return d.username == req.body.username;
    });
    const password = req.body.password;
    if(foundUser.length !=0 ){
        let match = await bcrypt.compare(password,foundUser[0].password);
        if(match){
            let access_token = jwt.sign({
                username : foundUser[0].username},
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: "30s"
                });
            let refresh_token = jwt.sign({
                username : foundUser[0].username},
                process.env.REFRESH_TOKEN,
                {
                    expiresIn: "83400s"
                });
           let otherUsers = usersd.filter((d)=>{return d.username != req.body.username;});
            UserDB.setUser([...otherUsers,{...foundUser,refresh_token}]);
            console.log(UserDB.Users);
            await fspromise.writeFile(path.join(__dirname,"..","Data","Users.json"),JSON.stringify(UserDB.Users));
            res.cookie("jwt",refresh_token,{httpOnly :true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.status(200).json({access_token});
        }else res.status(401).json({"message":"Passwords is incorrect"});
    }else res.status(401).json("Username not found")
}

module.exports = handleLogin;

require("crypto").randomBytes(64).toString('hex')