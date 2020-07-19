const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 50
    }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);