// value we set in res.local can be access in template engine
module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user;
    res.locals.login = req.session.isLogin;
    next();
  };
};
