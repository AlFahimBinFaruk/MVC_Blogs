const { body } = require("express-validator");

const blogValidator = [
  body("title").not().isEmpty().withMessage("Title cannnot be empty!").trim(),
];

module.exports = blogValidator;
