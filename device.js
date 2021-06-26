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
    order: {
        type: Number,
        required: true
    },
    row: {
        type: Number,
        required: true
    },
    orientation: {
        type: String,
        required: true
    },
    deviceWidth: {
        type: Number,
        required: true
    },
    deviceHeight: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model("device", deviceSchema)