const express = require("express");
const ServiceAds = require("../models/serviceAds");
const auth = require("../auth");
const users = require("../models/users");
// const serviceAds = require("../models/serviceAds");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let serviceAds = new ServiceAds(req.body);
        serviceAds.adOwner = req.users._id;
        serviceAds.save()
            .then((serviceAds) => {
                res.statusCode = 201;
                res.json(serviceAds);
            }).catch(next);
    })
    .get((req, res, next) => {
        ServiceAds.find()
            .then((serviceAds) => {
                res.json(serviceAds);
            })
            .catch((err) => {
                next(err);
            });
    });

router.route("/:adOwner")
    .get((req, res, next) => {
        // let serviceAds = new ServiceAds(req.body);
        ServiceAds.find({ adOwner: req.params.adOwner })
            .then((serviceAds) => {
                res.json(serviceAds);
            })
            .catch((err) => {
                next(err);
            })
    });

router.route("/:category")
    .get((req, res, next) => {
        ServiceAds.find({ category: req.params.category })
            .then((serviceAds) => {
                res.json(serviceAds);
            })
            .catch((err) => {
                next(err);
            });
    });

module.exports = router;