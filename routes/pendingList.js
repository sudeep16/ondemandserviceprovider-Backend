const express = require("express");
const Pendings = require("../models/pendingList");
const { model } = require("mongoose");
const router = express.Router();

router.route("/:id")
    .post((req, res, next) => {
        let pendings = new Pendings(req.body);
        pendings.customerID = req.user._id;
        pendings.serviceID = req.params.id;
        pendings.save()
            .then((pendings) => {
                res.statusCode = 201;
                res.json(pendings);
            }).catch(next);
    });

module.exports = router;