exports.isAuthenticated = (req, res, next) => {
  if (!req.session.isLogin) {
    return res.redirect("/auth/login");
  }
  next();
};

exports.isUnuthenticated = (req, res, next) => {
  if (req.session.isLogin) {
    return res.redirect("/dashboard");
  }
  next();
};
