const express = require ("express")
const router = express.Router()
const device = require("./device")
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



// module.exports = router

module.exports = function(app) {
    var todoList = require('./devicesController');
  
    // todoList Routes
    app.route('/devices')
      .get(todoList.list_all_devices)
      .post(todoList.create_a_device);
  
  
    app.route('/devices/:deviceID')
      .get(todoList.read_a_device)
      .put(todoList.update_a_device)
      .delete(todoList.delete_a_device);
  };
  