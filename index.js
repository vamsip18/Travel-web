if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
const express= require("express");
const mongoose= require("mongoose");
const path= require("path");
const Joi =require('joi');
const methodOverride= require("method-override");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const ejsMate=require("ejs-mate");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require('./Models/User.js');
// const initData=require("./init/app.js");
// const MONGO_URL = "mongodb://127.0.0.1:27017/Listing";
const db_url=process.env.ATLASDB_URL;
// const MONGO_URL = db_url;
const wrapAsync=require('./Utils/WrapAsync.js');
const listingsRoute=require('./routes/listing.js');
const reviewsRoute=require('./routes/review.js');
const userRoute=require('./routes/user.js');
const ExpressError=require('./Utils/ExpressError.js');
const app=express();

app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,'/public')));

const store=MongoStore.create({
    mongoUrl:db_url,
    crypto:{
        secret:"thisisasecret"
    },
    touchAfter:24*60*60
});

store.on("error",function(e){
    console.log("Error in Mongo session store ",e);
});

const sessionOptions={
    store,
    secret:"thisisasecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+7*60*60*24*7,
        maxAge:7*60*60*24*7
    }
}

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(db_url);
}

// app.get('/',wrapAsync(async(req,res)=>{
//     res.send("send response");
// }));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();         
})

app.use('/listings',listingsRoute);
app.use('/listings/:id/review',reviewsRoute);
app.use('/users',userRoute);

// app.get('/demouser',async(req,res)=>{
//     let user=new User({
//         email:"demo@gmail.com",
//         username:"delta"
//     });
//     let reg=await User.register(user,"demo");
//     res.send(reg);
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let {StatusCode=500,message }=err;
    res.status(StatusCode).render("error.ejs",{message});
});

// app.use((req, res, next) => {
//     console.log(`🔍 Request: ${req.method} ${req.url}`);
//     next();
//   });
  



app.listen(8080,()=>{
    console.log("app listening at port 8080");
});
