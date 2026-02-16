const { StatusCodes } = require("http-status-codes");
const { FlightService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function createFlight(req,res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            departureTime:req.body.departureTime,
            arrivalTime:req.body.arrivalTime,
            price:req.body.price,
            totalSeats:req.body.totalSeats,
            boardingGate:req.body.boardingGate
        })

        SuccessResponse.data = flight
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    }catch(error){
        console.log(error,"kapil")
        ErrorResponse.error = error 
        return res.status(error.statusCode).json(ErrorResponse)
    }
}

module.exports = {
    createFlight
}