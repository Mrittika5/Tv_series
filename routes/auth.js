const express=require('express')
const passport=require('passport')
const router= express.Router()
const User= require("../models/user.js")



router.get("/signup", (req,res)=>{
	
	
	res.render("signup.ejs",{message: req.flash('message')})
})

router.post("/signup",async (req,res)=>{
	try{const newUser=await User.register(new User(
	{
		username:req.body.username,
		email:req.body.email
		
	}),
	   req.body.password );
	
	console.log(newUser)
	passport.authenticate('local')(req,res, ()=>{
		
		res.redirect("/series");
	})
		
		
	}catch(err){
		console.log(err)
		res.send(err)
		
	}
})

router.get("/login",(req,res)=>{
	
	res.render("login.ejs",{message: req.flash('message')})
	
})

	router.post("/login", passport.authenticate('local',{
	successRedirect:'/series',
	failureRedirect:'/login',
		failureFlash : true  
})
	
)

router.get("/logout",(req,res)=>{
	
	
    req.logout();
	req.user=null;
	req.session.destroy();
	res.redirect("/series")
	
})
module.exports= router;