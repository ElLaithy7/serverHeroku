const mongoose = require("mongoose")
const deviceSchema = mongoose.Schema({
    deviceID: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        required: true
    },
    hoster: {
        type: Boolean,
        required: true
    }
    
})

module.exports = mongoose.model("device", deviceSchema)