const mongoose = require("mongoose")
const url = require("mongoose-type-url")


//---------------------------------------------------------------//

const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    logoLink: {
        type: url,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('college', collegeSchema) 