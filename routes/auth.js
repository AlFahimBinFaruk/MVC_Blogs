const router =require("express").Router()

router.get("/",(req,res)=>{
    res.render("auth/login.ejs")
})

router.get("/register",(req,res)=>{
    res.render("auth/register.ejs")
})

module.exports=router