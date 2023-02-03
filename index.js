const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const app = express();
const secretekey = "secreatekey";
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post('/login',(req,res) =>{
  const user ={
    id:'1',
    username:'pranita',
    email:'abc@gmail.com'
  }
  jsonwebtoken.sign({user},secretekey,{expiresIn:"3000s"},(err,token)=>
  {
res.json({
  token
})
  })
})
app.post("/profile",verifyToken,(req,res) => {

  jsonwebtoken.verify(req.token,secretekey,(err,authData)=>{
  if(err){
    res.send({result:"invalid Token"})
  }
  else{
    res.json({
      message:"profile Accesssed",
      authData
    })
  }
})
})

function verifyToken(req,res,next){
  const bearerHeaders = req.headers['authorization'];
  if(typeof bearerHeaders !== undefined){
const bearer = bearerHeaders.split(" ");
const token  = bearer[1];
req.token=token;
next();
  }
  else{
    res.send({
      result:'Token is not valid'
    })
  }
}


// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
