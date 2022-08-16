const { body } = require("express-validator");
const User = require("../../models/user");

const registerValidator = [
  body("username")
    .isLength({ min: 2, max: 15 })
    .withMessage("Username must be beetween 2 to 15")
    .custom(async (username) => {
      let user = await User.findOne({ username });
      if (user) {
        return Promise.reject("User alrady exits");
      }
    })
    .trim(),
  body("email")
    .isEmail()
    .withMessage("please provide a valid email")
    .custom(async (email) => {
      let useremail = await User.findOne({ email });
      if (useremail) {
        return Promise.reject("Email alrady exits");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Your password must be greater than 6 chars"),
];

module.exports = registerValidator;
