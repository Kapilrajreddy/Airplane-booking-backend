const { StatusCodes } = require("http-status-codes")
const { AirportRepository } = require("../repositories")
const AppError = require("../utils/errors/app-errors")

const airportRepository = new AirportRepository()
async function creatAirport(data){
    try{
        const airport = await airportRepository.create(data)
        return airport
    }catch(error){
        if(error.name=="SequelizeUniqueConstraintError"||error.name == "SequelizeValidationError"){
            let explanations=[]
            error.errors.forEach(err => {
                explanations.push(err)
            });
            throw new AppError(explanations,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("Not able to create the airport",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports={
    creatAirport
}