const mongoose = require('mongoose');


const seriesSchema=new mongoose.Schema( {
	Title: {type:String,required:true,unique:true},
	Description: String,
	Creator: String,
	Genre: String,
	Seasons: String,
	Image :String,
	Owner:{
		id: {
			
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username: String
		
		
	}
	
	
	
})
seriesSchema.index({
	
	'$**' : 'text'
})

const Series= mongoose.model("series", seriesSchema)
module.exports= Series;