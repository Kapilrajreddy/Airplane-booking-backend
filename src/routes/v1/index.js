const express = require('express')

const router = express.Router() 

const airplaneRoutes = require("./airplane-routes")

router.use("/airplanes",airplaneRoutes)

router.get("/info", (req,res)=>{
    res.send("hello start")
}
)

module.exports = router