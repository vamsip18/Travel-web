const mongoose= require("mongoose");
const Review=require('./Review.js');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    image:{
        url:String,
        filename:String,
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

// const listing = mongoose.model("listing",listingSchema);

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const listing = mongoose.model("listing",listingSchema);
module.exports=listing;
