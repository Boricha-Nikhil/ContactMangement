const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const contactController = require("../controllers/contact");
const { upload } = require("../helper/imageUpload");

router.post(
  "/add",
  [
    //body('name').isAlphanumeric().withMessage('Please enter number and letter only'),
    body("Phnumber")
      .isLength({ min: 10 })
      .withMessage("Please enter 10 number"),
  ],
  contactController.add
);
router.delete("/delete/:id", contactController.delete);
router.delete("/deleteMultiple", contactController.deleteMultiple);
router.put(
  "/update/:id",
  [
    //body('name').isAlphanumeric().withMessage('Please enter number and letter only'),
    body("Phnumber")
      .isLength({ min: 10 })
      .withMessage("Please enter 10 number"),
  ],
  contactController.update
);
router.get("/get", contactController.get);
router.get("/get/:id", contactController.getbyid);

module.exports = router;
