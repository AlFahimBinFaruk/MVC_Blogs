const router = require("express").Router();
// validators
const  loginValidator  = require("../validators/authValidators/login");
const  registerValidator = require("../validators/authValidators/register");
// authentication middlewares
const { isUnauthenticated ,isAuthenticated} = require("../middlewares/checkAuthentication");
// controllers
const {
  loginGetController,
  registerGetController,
  loginPostController,
  registerPostController,
  logoutController
} = require("../controllers/user");

// Login Routes
router.get("/login", isUnauthenticated, loginGetController);
router.post("/login", loginValidator, loginPostController);

// Register routes
router.get("/register", isUnauthenticated, registerGetController);
router.post("/register", registerValidator, registerPostController);

// Logout Route
router.get("/logout", isAuthenticated, logoutController);

module.exports = router;
