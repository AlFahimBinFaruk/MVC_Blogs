const { body } = require("express-validator");
module.exports = [
  body("title").not().isEmpty().withMessage("Title cannnot be empty!").trim(),
  body("description").trim(),
];
