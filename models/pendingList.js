const mongoose = require("mongoose");

const pendingListSchema = new mongoose.Schema({
    accept:{
        type: Boolean,
        require: true
    },
    customerID: {
        type: String,
        require: true
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("PendingList", pendingListSchema);