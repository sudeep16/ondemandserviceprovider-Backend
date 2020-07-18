const express = require("express");
const Wishlist = require("../models/wishlist");
const ServiceAds = require("../models/serviceAds");
const router = express.Router();

router.route("/:username")
    .post((req, res, next) => {
        let wishlist = new Wishlist(req.body);
        let serviceAds = new ServiceAds();
        wishlist.wishlistBy = req.params.username;
        wishlist.wishlisted = serviceAds;
        wishlist.save()
            .then((wishlists) => {
                res.statusCode = 201;
                res.json(wishlists);
            }).catch(next)
    });

module.exports = router;