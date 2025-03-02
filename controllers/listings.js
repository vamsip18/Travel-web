const listing=require('../Models/Listing.js');

module.exports.index=async(req,res)=>{
    let Listing=await listing.find();
    // console.log(Listing);
    if(Listing){
        res.render("listings.ejs",{Listing});
    }
    else{
        req.flash("error","No listings found");
        res.render("listings.ejs");
    }
}

module.exports.RenderingNew=async(req,res)=>{
    res.render("new.ejs");
}

module.exports.createListing=async(req,res)=>{
    // let {title , description , price , location ,country}={...req.body.Listing };
    let location=req.body.Listing.location;
    // console.log(location);
    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new listing(req.body.Listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            console.error("Error: No location found");
            return;
        }
        newListing.coordinates=[data[0].lat,data[0].lon];
    });
    await newListing.save();
    console.log(newListing);
    req.flash("success","Listing added successfully");
    // res.render("new.ejs");
    res.redirect('/listings');
}

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let list =await listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!list ){
        req.flash("error","No listings found with specified ID");
        res.redirect('/listings');
    }
    else{
        res.render("list.ejs",{list,id});
    }
}

module.exports.RenderingEdit=async(req,res)=>{
    let {id}=req.params;
    let list =await listing.findById(id);
    if(!list){
        req.flash("error","No listings found with specified ID");
        res.redirect('/listings');
    }
    else{
        let originalImageUrl=list.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
        res.render("edit.ejs",{list,id,originalImageUrl});
    }
}

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    let list =await listing.findByIdAndUpdate(id,{...req.body.Listing});
    if(typeof req.file!=='undefined'){
        let url=req.file.path;
        let filename=req.file.filename;
        list.image={url,filename};
        await list.save();
    }
    req.flash("success","Listing updated successfully");
    res.redirect('/listings');
}

module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
    let list =await listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted successfully");
    res.redirect('/listings');
};