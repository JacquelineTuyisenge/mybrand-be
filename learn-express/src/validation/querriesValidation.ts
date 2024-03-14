import Joi from 'joi';

const querriesSchema =  Joi.object({
    name: Joi.string().required().min(3).max(50).messages({
        "string.empty": "Name is required!",
        "string.min": "Name must be at least 3 characters long!",
        "string.max": "Name must be at most 50 characters long!",
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email is required!",
        "string.email": "Email must be a valid email address!"
    }),
    message: Joi.string().required().min(5).messages({
        "string.empty": "Message is required!",
        "string.min": "Message must be at least 5 characters long!"
    })
})

const validateQuerry = <T>(data: T) => {
    return querriesSchema.validate(data)
}

export default validateQuerry;