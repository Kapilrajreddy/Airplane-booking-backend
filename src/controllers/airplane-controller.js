const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { success } = require("../utils/common/success-response");

async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirPlane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    SuccessResponse.data = airplane;
    SuccessResponse.message = "Successfully created an airplane";

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating airplane";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAirplanes(req, res) {
  try {
    const airplanes = await AirplaneService.getAirPlanes();
    SuccessResponse.data = airplanes;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// api/v1/airplanes/:id
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    console.log(airplane,airplane,"airplane")
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createAirplane, getAirplanes,getAirplane };
