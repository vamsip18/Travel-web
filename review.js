const Joi = require('joi');

const ReviewSchema = Joi.object({
    review:Joi.object({
        content: Joi.string().required(),
        rating:Joi.number().min(1).max(5).required(),
    }).required(),
});

module.exports=ReviewSchema;