const express = require("express");
const router = express.Router();
const wrapAsync=require('../Utils/WrapAsync.js');
const ExpressError=require('../Utils/ExpressError.js');
const User=require('../Models/User.js');
const passport = require("passport");
const WrapAsync = require("../Utils/WrapAsync.js");
const {saveRedirectUrl} = require("../views/middleware.js");
const userController = require("../controllers/users");

//signUp route
router.route('/signup')
.get(userController.renderingSignup)
.post(WrapAsync(userController.signup));

//Login route
router.route('/login')
.get(userController.renderingLogin)
.post(saveRedirectUrl,passport.authenticate('local', { failureRedirect: '/users/login' ,failureFlash:true}),WrapAsync(userController.login));

//logout route
router.get('/logout', WrapAsync(userController.logout));

module.exports=router;