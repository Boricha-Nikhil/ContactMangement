const path = require("path");
const { findById } = require("../models/contact");
const ContactModel = require("../models/contact");
const { validationResult } = require("express-validator");
const fs = require("fs");

exports.add = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Please enter valid  Name and Number");
    error.statusCode = 422;
    res.status(201).json({ message: errors.array() });
    throw error;
  }
  try {
    let data = {
      name: req.body.name,
      Phnumber: req.body.Phnumber,
      image: req.file.path,
    };
    console.log("image", data.image);
    const contact = await ContactModel(data).save();
    res.status(200).json({ contact });
  } catch (err) {
    console.log(err);
  }
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Please enter valid  Name and Number");
    error.statusCode = 422;
    res.status(201).json({ message: errors.array() });
    throw error;
  }
  const id = req.params.id;
  const contact = await ContactModel.findById(id);
  let data = {
    name: req.body.name,
    Phnumber: req.body.Phnumber,
    image: req.file ? req.file.path : contact.image,
  };
  contact.name = data.name;
  contact.Phnumber = data.Phnumber;
  contact.image = data.image;
  const result = await contact.save();
  res.status(200).json({ result, message: "Updated Succesfully" });
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  const image = await ContactModel.findById(id);
  await ContactModel.findByIdAndRemove(id);
  fs.unlinkSync(image.image);
  res.status(200).json({ message: "Deleted Succesfully" });
};

exports.deleteMultiple = async (req, res) => {
  console.log(req.query);
  const id = req.query.arrayids;
  id.map(async (id) => {
    const result = await ContactModel.findByIdAndRemove(id);
  });
  res.status(200).json(result);
};

exports.get = async (req, res) => {
  const contacts = await ContactModel.find();
  res.status(200).json({ contacts });
};

exports.getbyid = (req, res) => {
  const id = req.params.id;
  ContactModel.findById(id).then((resdata) => {
    res.send(resdata);
  });
};
