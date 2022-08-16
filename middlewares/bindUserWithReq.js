const User = require("../models/user");

const bindUserWithReq = ()=>{
  return async (req, res, next) => {
    if (!req.session.isLogin) {
      return next();
    } else {
      try {
        let user = await User.findById(req.session.user._id);
        req.user = user;
        return next();
      } catch (error) {
        return next(error);
      }
    }
  }
};

module.exports = bindUserWithReq;
