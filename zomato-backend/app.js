const MONGODB_URI = "mongodb://127.0.0.1:27017/batch8thjan";
const express = require("express");
const mongoose = require("mongoose");
const APIRoutes = require("./routes/APIRoutes");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors()); 
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", APIRoutes);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server started at port ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
