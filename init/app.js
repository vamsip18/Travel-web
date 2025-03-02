const mongoose= require("mongoose");
const listing=require('../Models/Listing.js');
const initData = require("./Data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/Listing";

main().then(()=>{
    console.log("Connected to MongoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const InitDB = async() => {
    await listing.deleteMany({});
    initData.data= initData.data.map((obj)=>{return {...obj,owner:'67b4e9e50cde12331e80d985'}});
    listing.insertMany(initData.data);
    console.log("data was initialized");
}
// console.log(listing.find({}));
InitDB();
module.exports=listing;