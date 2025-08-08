const express = require('express')

const router = express.Router() 

router.get("/info", (req,res)=>{
    res.send("hello start")
}
)

module.exports = router