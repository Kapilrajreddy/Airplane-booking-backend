const {Flights} = require("../models");
const CrudRepository = require("./crud-repository");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flights)
    }
}

module.exports = FlightRepository
