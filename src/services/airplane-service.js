const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-errors");

const airplaneRepository = new AirplaneRepository();

async function createAirPlane(data) {
  try {
    const response = await airplaneRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "SequelizeValidationError") {
      let explanations = [];
      error.errors.forEach((err) => {
        explanations.push(err.message);
      });
      throw new AppError(explanations, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "can not create an airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirPlanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "can not fetch all the airplanes",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if ((error.statusCode == StatusCodes.NOT_FOUND)) {
      throw new AppError(
        "The airplane you requested not found",
        error.statusCode
      );
    }
    throw new AppError(
      "can not fetch the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const airplane = await airplaneRepository.destroy(id);
    return airplane
  } catch (error) {
    if ((error.statusCode = StatusCodes.NOT_FOUND)) {
      throw new AppError(
        "The airplane you requested not found",
        error.statusCode
      );
    }
    throw new AppError(
      "Bot able to delete the airplane",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id,data){
    try{
        const airplane = await airplaneRepository.update(id,data)
        return airplane
    }catch(error){
      if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError("Airplane not found with provided id",StatusCodes.NOT_FOUND)
      }
        throw new AppError("Not able to update the airplane",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
  createAirPlane,
  getAirPlanes,
  getAirplane,
  destroyAirplane,
  updateAirplane
};
