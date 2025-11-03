const {StatusCodes} = require('http-status-codes')
const { ErrorResponse } = require('../utils/common')
const AppError = require('../utils/errors/app-errors')

function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError("name not sent in the correct",StatusCodes.BAD_GATEWAY)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.code){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError("code not sent in the correct",StatusCodes.BAD_GATEWAY)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    if(!req.body.address){
        ErrorResponse.message = 'Something went wrong while creating airport'
        ErrorResponse.error = new AppError("address not sent in the correct",StatusCodes.BAD_GATEWAY)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    next()
}

module.exports = {validateCreateRequest}