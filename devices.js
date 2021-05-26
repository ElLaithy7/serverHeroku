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

router.get('/:deviceID', (req, res) => {
    const allDevices
    try {
        router.get("/", (req, res) => {
            try {
        
                const devices = await device.find();
                allDevices.send(devices)
            } catch (err) {
                allDevices.send("There was an error");
            }
           
        })
        const thisDevice = allDevices.find(c => c.deviceID === parseInt(req.params.deviceID));
        if (!thisDevice) res.status(404).send('This device does not exist');
        res.send(book);
    }
    catch (err) {
        res.send({message : err})
    }

   
    });

router.put("/:deviceID", async (req, res) => {
    const allDevices
    try {
        router.get("/", (req, res) => {
            try {
        
                const devices = await device.find();
                allDevices.send(devices)
            } catch(err) {
                allDevices.send("There was an error");
        }
        })
        if (allDevices != "There was an error") {
          
                const thisDevice = allDevices.find(c => c.deviceID == toString(req.params.deviceID));
            if (!thisDevice) res.status(404).send('Not Found');
            
            thisDevice.online = req.body.online;
            thisDevice.hoster = req.body.hoster;
            res.send(thisDevice);
            
            
        }
    }
    catch (err) {
        res.send({message: err})
    }
})
module.exports = router
