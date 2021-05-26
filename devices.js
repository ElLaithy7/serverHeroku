const express = require ("express")
const router = express.Router()
// const device = require("./device")
// router.get("/", async(req, res) => {
//     try {
        
//         const devices = await device.find();
//         res.json({data: devices})
//     } catch(err) {
//         res.json({message: err});
// }
// })
// router.post("/", async(req, res) => {
//     try {
//         const savedPost = await device.create(req.body); 
//         res.json(savedPost);
//     } catch(err) {
//       res.json({message: err});
//     }

// })
var devicesController = require('./devicesController');
  
    // devicesController Routes
    router.route('/devices')
      .get(devicesController.list_all_devices)
      .post(devicesController.create_a_device);
  
  
    router.route('/devices/:deviceID')
      .get(devicesController.read_a_device)
      .put(devicesController.update_a_device)
      .delete(devicesController.delete_a_device);


module.exports = router


  