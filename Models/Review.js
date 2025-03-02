const mongoose= require("mongoose");
const { min } = require("../Schema");

const Schema=mongoose.Schema;

const reviewSchema=new Schema({
    content:{
        type:String,
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
});

const review = mongoose.model("review",reviewSchema);

module.exports=review;