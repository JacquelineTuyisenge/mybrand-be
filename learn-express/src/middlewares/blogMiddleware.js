const { valid } = require('joi');
const validateBlog = require('../validation/blogs')

const isValid = (req, res, next) => {
    const {error} = validateBlog(req.body);
    console.log(error);

    if (error) return res.status(400).json({message: error.details[0].message});
    
    // if no error, middle ware continues
    try{
        next()
    } catch(error){
        console.log('error', error);
    }
};

module.exports = isValid;