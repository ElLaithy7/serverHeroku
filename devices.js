const express = require ("express")
const router = express.Router()
const device = require("./device")
router.get("/", async(req, res) => {
    try {
        
        const devices = await device.find();
        res.json({data: devices})
    } catch(err) {
        res.json({message: err});
}
})
router.post("/", async(req, res) => {
    try {
        const savedPost = await device.create(req.body); 
        res.json(savedPost);
    } catch(err) {
      res.json({message: err});
    }

})
module.exports = router
