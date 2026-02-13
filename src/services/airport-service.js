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

async function getAirports(){
    try{
        const airports = await airportRepository.getAll()
        return airports
    }catch(error){
        throw new AppError("Not able get the all airports",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id){
    try{
        const airport = await airportRepository.get(id)
        return airport;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested not found", error.statusCode)
        }
        throw new AppError("Failed to get the airport details",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id,data){
    try{
        const airport = await airportRepository.update(id,data)
        return airport
    }catch(error){
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested not found", error.statusCode)
        }
    }
}

module.exports={
    creatAirport,
    getAirports,
    getAirport,
    updateAirport
}