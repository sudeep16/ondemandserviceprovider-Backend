const express = require("express");
const Wishlist = require("../models/wishlist");
const ServiceAds = require("../models/serviceAds");
const router = express.Router();

router.route("/:username")
    .post((req, res, next) => {
        let wishlist = new Wishlist(req.body);
        wishlist.username = req.params.username;
        wishlist.wishlistOf = req.user._id;
        wishlist.save()
            .then((wishlists) => {
                res.statusCode = 201;
                res.json(wishlists);
            }).catch(next)
    });

router.route("/")
    .get((req, res, next) => {
        Wishlist.find({ wishlistOf: req.user._id })
        .then((wishlists)=>{
            res.json(wishlists);
        })
        .catch(next);
    });
// .get((req, res, next) => {
//     Wishlist.find({ username: req.params.username })
//         .then((wishlists) => {
//             res.json(wishlists);
//         })
//         .catch(next);
// });



// router.route("/")
//     .get((req, res, next) => {
//         Wishlist.findById()
//             .populate("wishlisted", "category")
//             .then((wishlists) => {
//                 res.json(wishlists);
//             })
//             .catch(next);
//     });

module.exports = router;