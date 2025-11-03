const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createAirport(req,res){
    try{
        const airport = await AirportService.creatAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        })
        SuccessResponse.data = airport 
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports={
    createAirport
}