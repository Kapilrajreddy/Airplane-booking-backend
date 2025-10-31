const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const cityRepository = new CityRepository();

async function createCity(data){
    try{
        const response = await cityRepository.create(data)
        return response
    }catch(error){
        console.log(error,"error")
        if(error.name=="SequelizeUniqueConstraintError"){
            let explanations=[]
            error.errors.forEach((err)=>{
                explanations.push(err.message)
            })
            throw new AppError(explanations,StatusCodes.CONFLICT)
        }
        throw new AppError("can not create the city",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAllCities(){
    try{
        const cities = await cityRepository.getAll()
        return cities
    }catch(error){
        throw new AppError("Failed to get all the cities",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getCity(id){
    try{
        const city = await cityRepository.get(id)
        return city
    }catch(error){
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError("City not found with provided id",StatusCodes.NOT_FOUND)
        }
        throw new AppError("Failed to get the city details",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


async function destroyCity(id){
    try{
        const city = await cityRepository.destroy(id)
        return city
    }catch(error){
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError("City not found with provided id",StatusCodes.NOT_FOUND)
        }
        throw new AppError("Failed to delete the city",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateCity(id,data){
    try{
        const city = await cityRepository.update(id,data)
        return city
    }catch(error){
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError("City not found with provided id",StatusCodes.NOT_FOUND)
        }
        if(error.name=="SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError"){
            let explanations=[]
            error.errors.forEach((err)=>{
                explanations.push(err.message)
            })
            throw new AppError(explanations,StatusCodes.CONFLICT)
        }
        throw new AppError("Failed to update the city",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createCity,
    getAllCities,
    getCity,
    destroyCity,
    updateCity
}