const express= require("express")
const router= express.Router()
const Comments= require("../models/comments.js")
const Series= require ('../models/series.js')
const isLoggedIn=require('../utils/isloggedin.js')
router.get("/series/search", async(req,res)=>{
 try{
	 
	const series= await Series.find({
		$text:{
			
			$search:req.query.term
		}
		
		
		
	})
	res.render("series.ejs",{series})
	 
	 
 }
	catch(err){
		
		console.log(err)
		res.send("broken search")
		
	}
	
})


router.get("/series/:id" ,(req,res)=>{
	let dr=[];
	
	Series.findById(req.params.id)
	.exec()
	.then((data)=>{
		dr=data
		Comments.find({seriesId:req.params.id})
		.exec()
		.then((data)=>{
			
		 res.render("show.ejs", {series:dr, comment:data})	
			
		})
		.catch((err)=>{
		req.flash("error", "No Series Found ")
		res.redirect("/series")
	
	})
	
		
	})
	.catch((err)=>{
		req.flash("error", "No Series Found ")
		res.redirect("/series")
	
	})
	

})
router.post("/series/:id" ,(req,res)=>{
	const x=req.body.seriesId
	console.log(x)
	
Comments.create({
	user: req.body.user,
	
	text:req.body.text,
	seriesId:req.body.seriesId,
	Owner:{
		id: req.user._id,
		username: req.user.username
	}
	
	
})
.then((com)=>{
  res.redirect(`/series/${x}`)
	
	//res.status(204).send()
	
	
		})
.catch((err)=>{
		console.log(err)
		res.send(err)
		
	})
		
	
	
})



router.get("/series/:id/edit", isLoggedIn, async(req,res)=>{
	if(req.isAuthenticated()){
		const series=	await Series.findById(req.params.id).exec()
		if(series.Owner.id.equals(req.user._id)){
		
				res.render("series_edit.ejs",{series})
		}
		else{
			res.redirect(`/series/${series._id}`)
		}
		
	}

	else{
			res.redirect("/series/${series._id}")
		}
	
	
	
})
router.put("/series/:id",(req,res)=>{
	
	const genre=req.body.Genre.toLowerCase();
	const UpdatedSeries= { 
    
	Title: req.body.Title,
	Description: req.body.Description,
	Creator: req.body.Creator,
	Genre: genre,
	Seasons: req.body.Seasons,
	Image :req.body.Image,
	
	}
	Series.findByIdAndUpdate(req.params.id,UpdatedSeries,{new:true})
	.exec()
	.then((data)=>{
		req.flash("success", " Series Updated Successfully      ")	
		res.redirect(`/series/${req.params.id}`)
		
		
		
	})
	.catch((err)=>{
		
		console.log("err")
	})
	
	
	
	
})
router.delete("/series/:id",(req,res)=>{
	
	Series.findByIdAndDelete(req.params.id)
	.exec()
	.then((data)=>{
		req.flash("success", "Series Deleted")	
		res.redirect("/series")
		
		
	})
	.catch((err)=>{
		
		console.log(err)
	})
	
	
	
})
	
module.exports= router














	