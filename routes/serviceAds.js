const express = require("express");
const ServiceAds = require("../models/serviceAds");
const router = express.Router();

router.route("/")
    .post((req, res, next) => {
        let serviceAds = new ServiceAds(req.body);
        serviceAds.adOwner = req.user._id;
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

router.route("/:category")
    .get((req, res, next) => {
        ServiceAds.find({ category: req.params.category })
            .populate("adOwner", ["username", "address", "phone"])
            .then((serviceAds) => {
                res.json(serviceAds);
            })
            .catch((err) => {
                next(err);
            });
    });

router.route("/mypost/services")
    .get((req, res, next) => {
        ServiceAds.find({ adOwner: req.user._id })
            .populate("adOwner", ["username", "address", "phone"])
            .then((serviceAds) => {
                res.json(serviceAds);
            }).catch(next);
    });

router.route("/postById/:id")
    .get((req, res, next) => {
        ServiceAds.find({ adOwner: req.params.id })
            .populate("adOwner", ["username", "address", "phone"])
            .then((serviceAds) => {
                res.json(serviceAds);
            }).catch(next);
    });

router.route("/modifyMyPost/:id")
    .get((req, res, next) => {
        ServiceAds.findOne({ _id: req.params.id })
            .then((serviceAds) => {
                res.json(serviceAds);
            }).catch(next);
    })
    .delete((req, res, next) => {
        ServiceAds.findOneAndDelete({ _id: req.params.id })
            .then((serviceAds) => {
                res.json(serviceAds)
            }).catch(next);
    })
    .put((req, res, next) => {
        ServiceAds.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then((serviceAds) => {
                if (serviceAds == null) throw new Error("Service Ads not found");
                res.json(serviceAds);
            }).catch(next);
    });


module.exports = router;