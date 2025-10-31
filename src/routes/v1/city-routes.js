const express = require("express");
const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");
const router = express.Router();

//api/v1/cities POST
router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

//api/v1/cities GET all cities 
router.get("/",CityController.getAllCities)


//api/v1/cities/:id GET city 
router.get("/:id",CityController.getCity)

//api/v1/cities/:id DELETE city
router.delete("/:id",CityController.destroyCity)

//api/v1/cities/:id UPDATE city
router.patch("/:id",CityController.updateCity)

module.exports = router;
