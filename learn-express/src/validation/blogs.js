// validate the blogs schema(table / document in mongodb)
const Joi = require('joi')

const BlogSchema =  Joi.object({ // means we are going to validate an object
    title: Joi.string().required(),
    author: Joi.string().required(),
    content: Joi.string().required()
});

const validateBlog = (blogData) => {
    return BlogSchema.validate(blogData);
}
module.exports = validateBlog;