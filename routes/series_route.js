const express= require("express")
const router= express.Router()
const Series= require ('../models/series.js')
const Comments= require("../models/comments.js")

router.get("/series",(req,res)=>{
	Series.find()
    .exec()
    .then((data)=>{
    const msg="Sorry, no series found"

	 
    res.render("series.ejs",{series:data,msg})

      })
    .catch((err)=>{
	  console.log(err)
	
     })
	
})
router.post("/series",(req,res)=>{

	const genre=req.body.Genre.toLowerCase();
	const newSeries= { 
    
	Title: req.body.Title,
	Description: req.body.Description,
	Creator: req.body.Creator,
	Genre: genre,
	Seasons: req.body.Seasons,
	Image :req.body.Image,
	Owner:{
		id: req.user._id,
		username: req.user.username
	}
	
	}
	Series.create(newSeries)
.then((ser)=>{

   
	
res.redirect("/series")
		})
.catch((err)=>{
		console.log(err)
		res.send(err)
		
	})
	
})


router.get("/series/search", async(req,res)=>{
 try{
	 
	const series= await Series.find({
		$text:{
			
			$search:req.query.term
		}
		
		
		
	})
	const msg="Sorry, no result found"
	res.render("series.ejs",{series,msg})
	 
	 
 }
	catch(err){
		
		console.log(err)
		res.send("broken search")
		
	}
	
})

router.get("/series/:uid/series",(req,res)=>{
	
	Series.find({"Owner.id": req.user._id})
	.exec()
	.then((data)=>{
		const msg="Sorry You have not added any series yet"
	
	 
		res.render("series.ejs",{series:data,msg})
		
	})
	
	
	
	
	
})






module.exports= router