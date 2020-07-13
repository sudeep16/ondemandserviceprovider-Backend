const mongoose = require("mongoose");

const hiredListSchema = new mongoose.Schema({
    paymentMethod: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    hiredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    hiredUsername: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("HiredList", hiredListSchema);