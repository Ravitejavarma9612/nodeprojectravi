require('dotenv').config(); //make .env file available
const express = require("express");
const mongoose = require("mongoose");
const {LogEvents} = require("./middleware/logger_mw");
const verifyUserMW = require("./middleware/verifyUserMW");
const app = express();

const bodyParser = require('body-parser');
const PORT = process.env.PORT ;


app.use(LogEvents);
app.use(express.json());
app.use((express.urlencoded({ extended: false })));
app.use(bodyParser.json());


app.get("/",(req,res)=>{
res.status(200).send("successfull");
});


app.use('/login',require("./routes/login"));

app.use('/auth',require("./routes/auth"));
app.use("/student",require("./routes/student"));




app.listen(PORT,()=>console.log(`listening to port ${PORT}`));