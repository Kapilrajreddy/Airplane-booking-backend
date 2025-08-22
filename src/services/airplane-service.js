const { StatusCodes } = require("http-status-codes")
const {AirplaneRepository} = require("../repositories")
const AppError = require("../utils/errors/app-errors")

const airplaneRepository = new AirplaneRepository()

async function createAirPlane(data){
    try{
        const response = await airplaneRepository.create(data)
        return response
    }catch(error){
        console.log(error)
        if(error.name=="SequelizeValidationError"){
            let explanations = []
            error.errors.forEach((err)=>{
                explanations.push(err.message)
            })
            throw new AppError(explanations,StatusCodes.BAD_REQUEST)
        }
        throw new AppError("can not create an airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirPlane
}