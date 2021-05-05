const mongoose = require('mongoose');


const commentsSchema=new mongoose.Schema( {
	
	user: String,
	text: String,
	seriesId:{
		
		type: mongoose.Schema.Types.ObjectId,
		ref: "Series"
		
	},
	Owner:{
		id: {
			
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
		
		
	}
		
	
	
	
})

const Comment= mongoose.model("commnet", commentsSchema)
module.exports= Comment;