const listing=require('../Models/Listing.js');
const review=require('../Models/Review.js');
const ListingSchema=require('../Schema.js');
const ReviewSchema=require('../review.js');
const ExpressError=require('../Utils/ExpressError.js');

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to add a listing");
        return res.redirect('/users/login');
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    // res.locals.redirectUrl='/listings';
    next();
};

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    if(!res.locals.currentUser._id.equals(list.owner._id)){
        req.flash("error","You don't have permission to do that");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,r_id}=req.params;
    let rvw=await review.findById(r_id);
    if(res.locals.currentUser&&!res.locals.currentUser._id.equals(rvw.author._id)){
        req.flash("error","You don't have permission to delete this review");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {errormsg}=ListingSchema.validate(req.body);
    if(errormsg){
        let errmsg=errormsg.details.map((l)=>l.message).join(',');
        console.log(errormsg);
        throw new ExpressError(400,errormsg.details);
    }
    else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    console.log(req.body);
    let { error } = ReviewSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((l)=>l.message).join(',');
        console.log(errmsg);
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}