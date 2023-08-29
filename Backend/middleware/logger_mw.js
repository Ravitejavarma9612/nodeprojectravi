const fspromises = require("fs").promises;
const fs = require("fs");
const {v4:uuid} = require("uuid");
const path =require("path");

const loggingToFile = async (message,file)=>{
const datetime = `datetime:${new Date().toLocaleDateString()}`;
const data = `log\tmethod:${message}\t${datetime}\tid:${uuid()}\n`;
try{
    if(!fs.existsSync(path.join(__dirname,"..","logs"))){
      await fspromises.mkdir(path.join(__dirname,"..","logs"));
    }
    await fspromises.appendFile(path.join(__dirname,"..","logs",file),data);
}catch(e){
    console.error(e.message);
}
}

const LogEvents = async (req,res,next)=>{
    loggingToFile(`${req.method}\t${req.headers.origin}\turl:${req.url}`,"logs.txt")
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
   next();
}

module.exports= {LogEvents};