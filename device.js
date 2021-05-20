const mongoose = require("mongoose")
const deviceSchema = mongoose.Schema({
    deviceID: {
        type: String,
        required: true
    },
    online: {
        type: Boolean,
        required: true,
        default: true
    },
    hoster: {
        type: Boolean,
        required: true,
        default: true
    }
    
})

module.exports = mongoose.model("device", deviceSchema)