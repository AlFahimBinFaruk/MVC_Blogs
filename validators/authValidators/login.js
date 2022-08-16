const { body } = require("express-validator");

const loginValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("please provide a valid email!!")
    .isEmail()
    .withMessage("please provide a valid email!!")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("password must be minimum 5 chars"),
];

module.exports = loginValidator;
