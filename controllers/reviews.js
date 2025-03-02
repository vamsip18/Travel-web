const review=require('../Models/Review');
const listing=require('../Models/Listing');

module.exports.deleteReview=async(req,res,next)=>{
    let {id,r_id}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:r_id}});
    await review.findByIdAndDelete(r_id);
    req.flash("success","Review deleted successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.editReview=async (req, res) => {
    let { id } = req.params;
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    let list = await listing.findById(id);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();
    req.flash("success", "Review added successfully");
    res.redirect(`/listings/${id}`);
}