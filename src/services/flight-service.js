const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const flightRepository = new FlightRepository()
async function createFlight(data){
    try{
        const flight = await flightRepository.create(data)
        return flight
    }catch(error){
        if(error.name=="SequelizeUniqueConstraintError"||error.name == "SequelizeValidationError"){
            let explanations = []
            error.errors.forEach(err=>{
                explanations.push(err)
            })
            throw new AppError(explanations,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Not able to create the flight",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createFlight
}