// validate the blogs schema(table / document in mongodb)
import Joi from 'joi';

const BlogSchema =  Joi.object({ // means we are going to validate an object
    title: Joi.string().required().messages({
        "string.empty": "Title of Blog is required!"
    }),
    imageUrl: Joi.string().messages({
        
    }),
    author: Joi.string().required().messages({
        "string.empty": "Blog's Author is required!"
    }),
    content: Joi.string().required().messages({
        "string.empty": "Blog content can't be empty!"
    })
});

const validateBlog = <T>(blogData:T) => {
    return BlogSchema.validate(blogData);
}
export default validateBlog;