const express = require("express");
const app = express();

require("./db/conn")
// const User = require('./model/userschema')


app.use(express.json())


app.use(require('./route/auth'))

//we link the router fil
const middleware = (req, res, next) => {
  console.log("hello my middleware");
  next();
};



app.get("/about", middleware, (req, res) => {
  res.send("<h1>Hello World from About Page !</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Hello World from Contact Page !</h1>");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App is running on PORT Number ${PORT}`);
});
