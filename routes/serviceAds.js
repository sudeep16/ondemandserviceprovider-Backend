const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ServiceAds = require("../models/serviceAds");
const router = express.Router();
const auth = require("../auth");

router.route("/")
.post((req,res,next) => {
    let serviceAds = new ServiceAds(req.body);
    serviceAds.save()
    .then((serviceAds)=>{
        res.statusCode = 201;
        res.json(serviceAds);
    }).catch(next);
});

module.exports = router;