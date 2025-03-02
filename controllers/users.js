const User=require('../Models/User.js');
const listing=require('../Models/Listing.js');
const review=require('../Models/Review.js');

module.exports.renderingSignup=(req, res) => {
    res.render('Signup.ejs');
}

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new User({email,username});
        let regUser=await User.register(newUser,password);
        req.flash("success","User Registered Successfully");
        req.login(regUser,(err)=>{
            if(err){
                return next(err);
            }
            return res.redirect('/listings');
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect('/users/signup');
    }
}

module.exports.renderingLogin=(req,res)=>{
    res.render('Login.ejs');
}

module.exports.login=async(req,res)=>{
    let {username,password}=req.body;
    req.flash("success","Welcome back to Wanderlust");
    let redirectUrl=res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout=async(req, res) => {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        req.flash("success","Logged out successfully");
        return res.redirect('/listings');
    });
}