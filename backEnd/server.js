const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

const port = 3000;

const corsOptions = {
//   origin: "http://localhost:5173",
origin:"*"
};
app.use(cors(corsOptions));

app.use(express.json());

const users = [
  {
    id: 1,
    name: "vishak",
    email: "vishakvn007@gmail.com",
    password: "password",
    phoneNumber: 9526383363,
  },
  {
    id: 2,
    name: "vishak2",
    email: "vishak2@gmail.com",
    password: "password",
    phoneNumber: 9526383362,
  },
  {
    id: 3,
    name: "vishak3",
    email: "vishak3@gmail.com",
    password: "password",
    phoneNumber: 9526383362,
  },
];

app.post("/submit", (req, res) => {
  let isAuthorized;

  const data = {
    email: req.body.email,
    password: req.body.password,
  };
console.log("data",data);

var user=users.find((user) => user.email === data.email && user.password === data.password);
  if (user){
    isAuthorized = true;
  } else {
    isAuthorized = false;
  }
  user={...user};



  if (!isAuthorized) {
    res.status(401).json({ msg: "invalid credentials" });
    return;
  }
  delete user.password;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  console.log("jwtSecretKey", jwtSecretKey);
  const token = jwt.sign(user, jwtSecretKey);
  console.log("token", token);
  res.json({ msg: "success", token: token });
});


app.get("/self-user", (req, res) => {
const token=req.headers.authorization;
if(!token){
    res.status(401).json({msg:"unauthorized"});
    return
}
jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
    if(err){
        res.status(401).json({msg:"unauthorized"});
        return
    }
    const userId=decoded.id;
    const user=users.find((users)=>{users.id===userId})
    console.log("user",user)


})

  
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
