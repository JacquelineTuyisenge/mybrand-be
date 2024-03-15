// usersValidation

import exp from 'constants';
import Joi from 'joi';

const usersSchema = Joi.object({
    fullName: Joi.string().required().regex(/^[A-Za-z]+ [A-Za-z]+$/).messages({
        "string.empty": "Name field can't be empty!",
        "string.pattern.base": "Invalid full name format. Please provide a first name followed by a space and a last name."
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email field can't be empty!",
        "string.email": "Invalid email"
    }),
    password: Joi.string().required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/).messages({
        "string.empty": "Password field can't be empty!",
        "string.pattern.base": "Password must be between 6 and 10 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
    }),
    confirmPassword: Joi.string().required().equal(Joi.ref('password')).messages({
        "any.only": "Password don't match!"
    }),
    role: Joi.string()
});


const validateUser = <T> (data: T) => {
    return usersSchema.validate(data)
}

export default validateUser;