const express = require("express");
const path = require("path");
//cors
const cors = require("cors");

//to set data type
const bodyParser = require("body-parser");
const multer = require("multer");
//mongoose
const mongoose = require("mongoose");

//import auth routes
const contactRoutes = require("./routes/contact");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    console.log("Hi", file);
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/contact", contactRoutes);

// global error control
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error;
  res.status(status).json({ message });
});

// mongoose db connection
mongoose
  .connect(
    "mongodb+srv://Nikhil_007:Nikhil071299@cluster0.jnpbg.mongodb.net/contact"
  )
  .then(() => {
    console.log("DB connected Successfully on 3002");
  })
  .catch((error) => {
    console.error("DB connection failed ======>", error);
  });

app.listen(3002);
