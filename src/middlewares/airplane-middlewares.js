const {StatusCodes} = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-errors')

function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = 'Something went wrong while creating airplane'
        ErrorResponse.error = new AppError("Model number not sent in the correct",StatusCodes.BAD_GATEWAY)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

module.exports = {validateCreateRequest}