const express=require('express')
const passport=require('passport')
const router= express.Router()
const User= require("../models/user.js")

const isLoggedIn=require('../utils/isloggedin.js')

router.get("/signup", (req,res)=>{
	
	
	res.render("signup.ejs")
})

router.post("/signup",async (req,res)=>{
	try{const newUser=await User.register(new User(
	{
		username:req.body.username,
		email:req.body.email
		
	}),
	   req.body.password );
	
	req.flash("success", `Signed up as ${newUser.username}`)
	passport.authenticate('local')(req,res, ()=>{
		
		res.redirect("/series");
	})
		
		
	}catch(err){
		console.log(err)
		req.flash("error", `Username already exists`)
		res.redirect("/signup")
		
	}
})

router.get("/login",(req,res)=>{
	
	res.render("login.ejs",{message: req.flash('message')})
	
})

	router.post("/login", passport.authenticate('local',{
	successRedirect:'/series',
	failureRedirect:'/login',
		failureFlash : true ,
		
})
	
)

router.get("/logout",(req,res)=>{
	
	
    req.logout();
	req.flash("success","logged you out")
	
	res.redirect("/")
	
})
module.exports= router;