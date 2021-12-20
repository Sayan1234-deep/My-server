const mongoose = require('mongoose')


const DB =
  "mongodb+srv://sayan:sayan1234@cluster0.osuy8.mongodb.net/mernstack?retryWrites=true&w=majority";
//password = sayan1234
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log("no connection", err);
  });
