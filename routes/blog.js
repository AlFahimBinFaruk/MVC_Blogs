const router =require("express").Router()

router.get("/create",(req,res)=>{
    res.render("blog/createBlog.ejs")
})

router.get("/edit/:id",(req,res)=>{
    res.render("blog/editBlog.ejs")
})

router.get("/my-blogs",(req,res)=>{
    res.render("blog/myBlogs.ejs")
})

router.get("/details",(req,res)=>{
    res.render("blog/blogDetails.ejs")
})


module.exports=router