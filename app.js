//==============================
//npm import
//==============================
const express = require("express")
const app = express()
const fetch = require("node-fetch")
const bodyParser=require("body-parser")
var flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride=require('method-override')
//const morgan= require("morgan")
//=============================================
//authentication imports
//==================================
const passport= require('passport')
const passportLocal= require("passport-local")
const expressSession= require('express-session')
const LocalStrategy= passportLocal.Strategy
//config imports
try{var config= require("./config.js")}
catch (e){
	console.log("could not import config")
	console.log(e)
	
	
}
try{
	mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}); 
}
catch (e){
	console.log("could not connect")
    mongoose.connect(process.env.DB_CONNECTION_STRING,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	
	
}







//===================================
//models import
//==================================
const Series= require("./models/series.js")
const Comments= require("./models/comments.js")
const User= require("./models/user.js")

//=====================================
//use block
//===========================================
app.use(bodyParser.urlencoded({extended:true}))
app.use(flash());


//======================================
//express-session config
//===========================================
app.use(expressSession({
	 secret:process.env.ES_SECRET|| config.expressSession.secret,
	resave:false,
	saveUninitialized: false
	
}))
//======================
//passport config
//==================

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy(User.authenticate()))

//=========================================
//current user middleware setting
//============================================


app.use((req,res,next)=>{

res.locals.user=req.user;
next();
})






//=======================================
//route imports( this should be after express and passport session or you get did not use session.initializer error -_-)
//=====================================
const series_route= require("./routes/series_route.js")
const comments_route=require("./routes/comments_route.js")
const auth_routes=require("./routes/auth.js")
const index=require("./routes/index.js")
//================================

//use block
//===============================
app.set("view engine","ejs")
app.use(methodOverride('_method'))
app.use(express.static("public"))
//app.use(morgan('tiny'))
app.use(series_route)
app.use(comments_route)
app.use(auth_routes )
app.use(index)



app.listen(process.env.PORT || 3000,()=>{
	
	console.log("server runing")
})



