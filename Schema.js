const Joi = require('joi');
const review=require('./Models/Review.js');
// import {review} from './Models/Review.js';
const ListingSchema = Joi.object({
    listing:Joi.object({
        title: Joi.string().required(),
        Desciption:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().min(0).required(),
        image:Joi.string().allow("",null),
    }).required()
});

const ReviewSchema = Joi.object({
    review:Joi.object({
        content: Joi.string().required(),
        rating:Joi.number().min(1).max(5).required(),
    }).required(),
});

module.exports=ListingSchema;

module.exports=ReviewSchema;