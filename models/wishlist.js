const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    wishlistBy: {
        type: String,
        required: true
    },
    wishlisted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceAds"
    }
});

module.exports = mongoose.model("Wishlist", wishlistSchema);