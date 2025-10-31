const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { success } = require("../utils/common/success-response");
const AppError = require("../utils/errors/app-errors");

//api/v1/cities/ POST
async function createCity(req, res) {
  try {
    const response = await CityService.createCity({
      name: req.body.name,
      pincode: req.body.pincode,
    });
    SuccessResponse.data = response;
    SuccessResponse.message = "Successfully created the city";

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllCities(req, res) {
  try {
    const cities = await CityService.getAllCities();
    SuccessResponse.data = cities;
    SuccessResponse.message = "All cities fetched";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getCity(req, res) {
  try {
    const city = await CityService.getCity(req.params.id);
    SuccessResponse.data = city;
    SuccessResponse.message = "Fetched single city details";

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function destroyCity(req, res) {
  try {
    const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully deleted the city";

    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const { name, pincode } = req.body;
    if (!name && !pincode) {
      throw new AppError("Details are not found", StatusCodes.BAD_REQUEST);
    }
    const updatedData = {};
    if (name !== undefined) updatedData.name = name;
    if (pincode !== undefined) updatedData.pincode = pincode;
    const city = await CityService.updateCity(req.params.id, updatedData);
    SuccessResponse.data = city;
    SuccessResponse.message = "Successfully updated the city";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  createCity,
  getAllCities,
  getCity,
  destroyCity,
  updateCity,
};
