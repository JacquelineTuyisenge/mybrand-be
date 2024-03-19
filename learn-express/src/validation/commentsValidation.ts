import Joi from 'joi';

const commentSchema =  Joi.object({
    author: Joi.string().required().messages({
        "string.empty": "Comment's Author is required!"
    }),
    comment: Joi.string().required().messages({
        "string.empty": "Comment can't be empty!"
    })
})

const validateComment = (comment: { author: string; comment: string }) => {
    return commentSchema.validate(comment);
};

export default validateComment;