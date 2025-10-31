const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");
const router = express.Router();

//api/v1/airplanes POST
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
);

//api/v1/airplanes GET
router.get("/", AirplaneController.getAirplanes);

//api/v1/airplanes/:id GET by id
router.get("/:id", AirplaneController.getAirplane);

//api/v1/airplanes/:id DELETE by id
router.delete("/:id", AirplaneController.destroyAirplane);

//api/v1/airplanes/:id UPDATE by id
router.patch("/:id", AirplaneController.updateAirplane);

module.exports = router;
