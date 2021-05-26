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

router.get("/:deviceID",  async (req, res) => {
    try {
        const thisdevice = await device.findById(req.params.deviceID)
        res.json({data: thisdevice})
    }
    catch (err) {
        res.send(err)
    }
})

router.put("/:deviceID", (req, res) => {
    try {
        device.findOneAndUpdate({_id: req.params.deviceID}, req.body, {new: true}, function(err, device) {
            res.json(device);
          });
    }
    catch (err) {
        res.send(err)
    }
})

router.delete("/:deviceID", (req, res) => {
    try {
        device.remove({
            _id: req.params.deviceID
          }, function(err, device) {
           
            res.json({ message: 'Device successfully deleted' });
          });
    }
    catch (err) {
        res.send(err)
    }
})

module.exports = router
