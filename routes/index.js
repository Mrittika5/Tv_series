const express= require("express")
const isLoggedIn=require('../utils/isloggedin.js')
const router= express.Router()
router.get("/",(req,res)=>{
	console.log(req.user)
	res.render("landing.ejs")
})
module.exports=router