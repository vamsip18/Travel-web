const express = require("express");
const router = express.Router({mergeParams:true});
const listing=require('../Models/Listing.js');
const ExpressError=require('../Utils/ExpressError.js');
const wrapAsync=require('../Utils/WrapAsync.js');
const review=require('../Models/Review.js');
const ReviewSchema=require('../Schema.js');
const {isReviewAuthor,validateReview} = require("../views/middleware.js");
const reviewController = require("../controllers/reviews");

//delete route
router.delete('/:r_id',isReviewAuthor,wrapAsync(reviewController.deleteReview));

//edit route
router.post('/new', validateReview, wrapAsync(reviewController.editReview));

module.exports=router;