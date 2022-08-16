exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLogin) {
    return res.redirect("/user/login");
  }
  next();
};

exports.isUnauthenticated = (req, res, next) => {
  if (req.session.isLogin) {
    return res.redirect("/");
  }
  next();
};
