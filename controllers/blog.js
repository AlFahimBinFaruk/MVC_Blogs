const Flash = require("../utils/flashMSG");
const { validationResult } = require("express-validator");
const errorformat = require("../utils/errorFormator");

const Blog = require("../models/blog");

// get my blogs
exports.getMyBlogsController = async (req, res, next) => {
  try {
    let blogList = await Blog.find({ bloggerId: req.user._id });
    res.render("blog/myBlogs.ejs", {
      flashMsg: Flash.getMsg(req),
      blogList,
    });
  } catch (error) {
    next(error);
  }
};

// create blog get controller
exports.createBlogGetController = (req, res) => {
  res.render("blog/createBlog.ejs", {
    flashMsg: Flash.getMsg(req),
    title: "",
    errorobj: {},
    value: {},
  });
};

// create blog post handler
exports.createBlogPostController = async (req, res, next) => {
  let { title, description } = req.body;

  // error validations
  let error = validationResult(req).formatWith(errorformat);
  // if error show error
  if (!error.isEmpty()) {
    return res.render("blog/createBlog.ejs", {
      flashMsg: Flash.getMsg(req),
      title: "",
      errorobj: error.mapped(),
    });
  }

  // create new blog
  let blog = new Blog({
    title,
    description,
  });
  // we will update the thumbnail if it is there
  if (req.file) {
    blog.thumbnail = `/thumbnails/${req.file.filename}`;
  }

  try {
    // save the blog
    await blog.save();

    req.flash("success", "post created successfully");
    // redirect to home/my blog list
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

// edit blog get controlller
exports.editBlogGetController = async (req, res, next) => {
  let blogId = req.params.id;
  try {
    //    find the blog by bloggerId and blog id
    let blog = await Blog.findOne({
      bloggerId: req.user._id,
      _id: blogId,
    });

    // if the blog dont exits or you cannot access it
    if (!blog) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    // if exits and you can access it
    res.render("blog/editBlog.ejs", {
      flashMsg: Flash.getMsg(req),
      errorobj: {},
      blog,
    });
  } catch (error) {
    next(error);
  }
};

// handle edit blog post controller
exports.editBlogPostController = async (req, res, next) => {
  let { title, description } = req.body;
  //   blog id
  let blogId = req.params.id;
  //   validate req
  let error = validationResult(req).formatWith(errorformat);

  try {
    // if the blog exits and you can access it
    let blog = await Blog.findOne({
      bloggerId: req.user._id,
      _id: blogId,
    });
    // if the blog dont exits or you cannot access it
    if (!blog) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    // if validations fails
    if (!error.isEmpty()) {
      return res.render("blog/editBlog.ejs", {
        flashMsg: Flash.getMsg(req),
        errorobj: error.mapped(),
        blog,
      });
    }

    // if thumbnail is not updated keep it or update with the new one
    let thumbnail = blog.thumbnail;

    if (req.file) {
      thumbnail = `/uploads/${req.file.filename}`;
    }
    //    update blog
    await Blog.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $set: {
          title,
          description,
          thumbnail,
        },
      },
      {
        new: true,
      }
    );

    req.flash("success", "Blog updated successfully");
    // redirect to home
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.deleteBlogController = async (req, res, next) => {
  let blogId = req.params.blogId;

  try {
    // if the blog exits and you can access it
    let blog = await Blog.findOne({
      bloggerId: req.user._id,
      _id: blogId,
    });
    // if the blog dont exits or you cannot access it
    if (!blog) {
      let error = new Error("404 page not found");
      error.status = 404;
      throw error;
    }
    // if you can access it delete it
    await Blog.findOneAndDelete({ _id: blogId });

    req.flash("success", "Blog deleted successfully");
    // redirect to home
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
