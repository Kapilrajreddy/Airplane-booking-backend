const express = require("express");
const { AirportController } = require("../../controllers");
const { AirportMiddleware } = require("../../middlewares");
const router = express.Router();

//api/v1/airports POST
router.post(
  "/",
  AirportMiddleware.validateCreateRequest,
  AirportController.createAirport
);

module.exports = router