const mongoose = require("mongoose");

const feedbacksSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    commentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentOn: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Feedbacks", feedbacksSchema);