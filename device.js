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
    },
    downloaded: {
        type: Array,
        required: true,
        default:[]
    },
    longtitude: {
        type: double,
        required: true,
        default: 0.0

    },
    latitude: {
        type: double,
        required: true,
        default: 0.0
    }
    
})

module.exports = mongoose.model("device", deviceSchema)