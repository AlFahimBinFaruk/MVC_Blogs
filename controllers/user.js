const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const Flash = require("../utils/flashMSG");
const errorformat = require("../utils/errorFormator");

// get register page
exports.registerGetController = (req, res, next) => {
  res.render("user/register.ejs", {
    errorobj: {},
    value: {},
    flashMsg: Flash.getMsg(req),
  });
};

//handle submit req from register page
exports.registerPostController = async (req, res, next) => {
  const { username, email, password } = req.body;

  // validate the data
  let error = validationResult(req).formatWith(errorformat);
  //show error if validation fails
  if (!error.isEmpty()) {
    return res.render("user/register.ejs", {
      errorobj: error.mapped(),
      value: {
        username,
        email,
        password,
      },
      flashMsg: Flash.getMsg(req),
    });
  }

  // if validation is successful move further
  try {
    // hash password
    let hashpassword = await bcrypt.hash(password, 11);
    // create new user
    const user = new User({
      username,
      email,
      password: hashpassword,
    });
    await user.save();
    req.flash("success", "user created successfully login to continue");
    res.redirect("/user/login");
  } catch (e) {
    next(e);
  }
};

// get login page
exports.loginGetController = (req, res, next) => {
  res.render("user/login.ejs", {
    errorobj: {},
    msg: "",
    flashMsg: Flash.getMsg(req),
  });
};

// handle login post req
exports.loginPostController = async (req, res, next) => {
  const { email, password } = req.body;

  // validate data
  let error = validationResult(req).formatWith(errorformat);
  // show error if validation fail
  if (!error.isEmpty()) {
    req.flash("fail", "some error occured");
    return res.render("user/login.ejs", {
      errorobj: error.mapped(),
      msg: "",
      flashMsg: Flash.getMsg(req),
    });
  }
  // if validation is successful move further
  try {
    // find user
    const user = await User.findOne({
      email,
    });
    // if user not found
    if (!user) {
      req.flash("fail", "Invalid Credentials");
      return res.redirect("/user/login");
    }
    // if user if found match password
    let match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("fail", "Invalid Credentials");
      return res.redirect("/user/login");
    }
    // set session in req
    req.session.isLogin = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Login successful");
      res.redirect("/");
    });
  } catch (e) {
    next(e);
  }
};

// handle logout
exports.logoutController = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    return res.redirect("/user/login");
  });
};
