const router = require("express").Router();
// validators
const blogValidator = require("../validators/blogValidations/blog");
// upload middleware
const uploadFile = require("../middlewares/handleUpload");
// authentication middlewares
const { isAuthenticated } = require("../middlewares/checkAuthentication");
// controllers
const {
  createBlogGetController,
  createBlogPostController,
  editBlogGetController,
  editBlogPostController,
  getMyBlogsController,
  deleteBlogController,
  getMyBlogDetailsController,
} = require("../controllers/blog");

// Get my Blog list route
router.get("/", isAuthenticated, getMyBlogsController);

// Get my blog details
router.get("/details/:id", isAuthenticated, getMyBlogDetailsController);

// Create Blog routes
router.get("/create", isAuthenticated, createBlogGetController);
router.post(
  "/create",
  uploadFile.single("thumbnail"),
  blogValidator,
  createBlogPostController
);

// Edit Blog routes
router.get("/edit/:id", isAuthenticated, editBlogGetController);
router.post(
  "/edit/:id",
  uploadFile.single("thumbnail"),
  editBlogPostController
);

// Delete Blog routes
router.get("/delete/:id", isAuthenticated, deleteBlogController);

module.exports = router;
