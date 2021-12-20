const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("../db/conn");
const User = require("../model/userschema");

router.get("/", (req, res) => {
  res.send("<h1>Hello World from Home Page Router.js !</h1>");
});

//registration

router.post("/register", (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "All Fields Are Requird !" });
  }

  if (password !== cpassword) {
    return res.status(422).json({ error: "Password does not match :(" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: " Email Already Exists" });
      }
      const user = new User({ name, email, phone, work, password, cpassword });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "user registred successfully" });
        })
        .catch((err) => {
          res.status(422).json({ error: "failed to register" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

//login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ error: "Pls fill all the data" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken",token,{
        expire:new Date(Date.now() + 25892000000),
        httpOnly:true
      })
      if (!isMatch) {
        res.status(422).json({ error: "Invalid crdentials" });
      } else {
        res.status(200).json({ message: "User Signed in Successfully :)" });
      }
    } else {
      res.status(422).json({ error: "Not Found" });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
