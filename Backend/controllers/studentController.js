
const {studentdb} = require("../Data/data")


const getStudent = (req,res)=>{
  if(!req.params || !req.params.username) return res.status(400).json({"message":"Params required"});
  const foundStudent = studentdb.students.filter((d)=>{return d.username===req.params.username;});
  if(foundStudent.length>0){
      res.status(200).send(foundStudent[0]);
  }else{
      res.status(404).send("User not found");
  }
};

module.exports= getStudent;