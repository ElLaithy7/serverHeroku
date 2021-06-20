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
        type: Number,
        required: true,
        default: 0.0

    },
    latitude: {
        type: Number,
        required: true,
        default: 0.0
    }
    
})

module.exports = mongoose.model("device", deviceSchema)