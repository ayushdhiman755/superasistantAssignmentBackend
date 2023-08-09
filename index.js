const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const Paper = require("./model/Paper");
// const JSON=require("")

mongoose
  .connect(
    "mongodb+srv://ayushdhiman755:1@cluster0.xsde2zl.mongodb.net"
  )
  .then(() => {
    console.log("connected ");
  })
  .catch((err) => console.log("Mongoose Error",err));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json("hello");
});
app.post("/addQuestion", async (req, res) => {
  console.log(req.body);
  try {
    let obj = {
      Question1: JSON.stringify(req.body.Question1),
      Question2: JSON.stringify(req.body.Question2),
      Question3: JSON.stringify(req.body.Question3),
    };
    console.log(obj);
    const paper = new Paper({
      Question1: JSON.stringify(req.body.Question1),
      Question2: JSON.stringify(req.body.Question2),
      Question3: JSON.stringify(req.body.Question3),
    });
    console.log("paper ", paper);
    const savedPaper = await paper.save();
    console.log("saved paper", savedPaper);
    res.status(200).json(savedPaper.id);
  } catch (err) {
    console.log(err);
    res.status(501).json("Internal Server Error");
  }
});
app.get("/getQuestion/:id", async (req, res) => {
  try {
    const data = await Paper.findById(req.params.id);
    let questions = {};
    questions["Question1"] = JSON.parse(data["Question1"]);
    questions["Question2"] = JSON.parse(data["Question2"]);
    questions["Question3"] = JSON.parse(data["Question3"]);
    questions["Question1"].items = [
      ...Object.keys(questions["Question1"].items),
    ];
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(501).json("Internal Server Error");
  }
});

app.listen(9090, () => {
  console.log("Server at port 9090");
});
