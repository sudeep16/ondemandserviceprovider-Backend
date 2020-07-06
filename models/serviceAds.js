const mongoose = require("mongoose");

const serviceAdSchema = new mongoose.Schema({
    category: {
        type: String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    openingTime:{
        type: String,
        required:true
    },
    closingTime: {
        type: String,
        required: true
    },
    daysFrom:{
        type: String,
        required:true
    },
    daysTo:{
        type: String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    serviceProvider:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("ServiceAds", serviceAdSchema);