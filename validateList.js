const joi = require('joi');
const listSchema = joi.object({
    listing : joi.object({
        title: joi.string().required(),
        image: joi.string().allow("",null),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        description: joi.string().required(),
        contact: joi.string().required(),
        country: joi.string().required()
    }).required()
});

module.exports = listSchema;