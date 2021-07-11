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
        required: true,
        default: 99
    },
    row: {
        type: Number,
        required: true,
        default: 99
    },
    orientation: {
        type: String,
        required: true,
        default: "null"
    },
    deviceWidth: {
        type: Number,
        required: true,
        default: 1

    },
    deviceHeight: {
        type: Number,
        required: true,
        default: 1
    },
    numOfDevices: {
        type: Number,
        required: true,
        default: 0
    },
    posInColumn: {
        type: String,
        required: true,
        default: "0"
    },
    posInRow: {
        type: String,
        required: true,
        default: "0"
    }
    
})

module.exports = mongoose.model("device", deviceSchema)