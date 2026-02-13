const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-errors");

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

async function getAirports(req,res){
    try{
        const airports = await AirportService.getAirports()
        SuccessResponse.data = airports 
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error 
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function getAirport(req,res){
    console.log("called")
    try{
        const airport = await AirportService.getAirport(req.params.id)
        SuccessResponse.data = airport 
        return res.status(StatusCodes.OK).json(SuccessResponse)
    }catch(error){
        ErrorResponse.error = error 
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

async function updateAirport(req,res){
    try{
        const {id} = req.params
        const {name,code,address,cityId} = req.body 

        if(!name && !code && !address && !cityId){
            throw new AppError("At least one field is required",StatusCodes.BAD_REQUEST)
        }

        const updateData = {}
        if(name!==undefined) updateData.name = name
        if(code!==undefined) updateData.code = code 
        if(address!==undefined) updateData.address = address

        const updatedAirport = await AirportService.updateAirport(
              id,
              updateData
        );
        SuccessResponse.data = updatedAirport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error 
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    updateAirport
}