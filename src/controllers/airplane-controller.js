const { StatusCodes } = require("http-status-codes");
const { AirplaneService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { success } = require("../utils/common/success-response");
const AppError = require("../utils/errors/app-errors");

// api/v1/airplanes/:id POST
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

// api/v1/airplanes/ GET
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

// api/v1/airplanes/:id GET
async function getAirplane(req, res) {
  try {
    const airplane = await AirplaneService.getAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

// api/v1/airplanes/:id DELETE
async function destroyAirplane(req, res) {
  try {
    const airplane = await AirplaneService.destroyAirplane(req.params.id);
    SuccessResponse.data = airplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateAirplane(req, res) {
  try {
    const { id } = req.params;
    const { modelNumber, capacity } = req.body;

    if (!modelNumber && !capacity) {
      throw new AppError(
        "At least one field (modelNumber or capacity) is required for update",
        StatusCodes.BAD_REQUEST
      );
    }

    const updateData = {};
    if (modelNumber !== undefined) updateData.modelNumber = modelNumber;
    if (capacity !== undefined) updateData.capacity = capacity;

    const updatedAirplane = await AirplaneService.updateAirplane(
      id,
      updateData
    );
    SuccessResponse.data = updateAirplane;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = { createAirplane, getAirplanes, getAirplane, destroyAirplane,updateAirplane };
