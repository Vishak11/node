const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
};
app.use(cors(corsOptions));

app.use(express.json());

const users = [
  {
    email: "vishakvn007@gmail.com",
    password: "password",
    phoneNumber: 9526383363,
  },
  {
    email: "vishak2@gmail.com",
    password: "password",
    phoneNumber: 9526383362,
  },
  {
    email: "vishak2@gmail.com",
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

  if (users.find((user) => user.email === data.email && user.password === data.password)){
    isAuthorized = true;
  } else {
    isAuthorized = false;
  }

  console.log("email ", data.email);
  console.log("passWord", data.password);
  if (!isAuthorized) {
    res.status(401).json({ msg: "invalid credentials" });
    return;
  }
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  console.log("jwtSecretKey", jwtSecretKey);
  const token = jwt.sign(data, jwtSecretKey);
  console.log("token", token);
  res.json({ msg: "success", token: token });
});

app.get("/verify",(req,res)=>{
    const token = req.headers.authorization;
    console.log("token",token);
    if(!token){
        res.status(401).json({msg:"unauthorized"});
        return;
    }
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        if(err){
        res.status(401).json({msg:"unauthorized"});
        return;
        }
        res.json({msg:"success",decoded:decoded});
        console.log("newPAge",decoded)
    });
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
