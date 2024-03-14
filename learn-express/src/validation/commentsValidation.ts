import Joi from 'joi';

const commentSchema =  Joi.object({
    comment: Joi.string().required().messages({
        "string.empty": "Comment can't be empty!"
    })
})

const validateComment = <T>(comment: T) => {
    return commentSchema.validate(comment);
}

export default validateComment;