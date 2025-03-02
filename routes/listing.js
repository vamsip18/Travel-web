const express = require("express");
const ExpressError=require('../Utils/ExpressError.js');
const router = express.Router();
// const Listing=require('../Models/Listing.js');
const listing=require('../Models/Listing.js');
const wrapAsync=require('../Utils/WrapAsync.js');
const {isLoggedIn, isOwner, validateListing} = require("../views/middleware.js");
const path = require("path");
const ListingController = require("../controllers/listings");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});
//index route
router.get('/',wrapAsync(ListingController.index));

//new route
router.route('/new')
.get(isLoggedIn,ListingController.RenderingNew)
.post(isLoggedIn,upload.single(`Listing[image]`),wrapAsync(ListingController.createListing));
//show route

router.get('/:id',wrapAsync(ListingController.showListing));

//edit route
router.route('/edit/:id')
.get(isLoggedIn,isOwner,wrapAsync(ListingController.RenderingEdit))
.patch(isLoggedIn,isOwner,upload.single(`Listing[image]`),validateListing,wrapAsync(ListingController.editListing));

//delete route
router.delete('/delete/:id',isLoggedIn,isOwner,wrapAsync(ListingController.deleteListing));

module.exports=router;