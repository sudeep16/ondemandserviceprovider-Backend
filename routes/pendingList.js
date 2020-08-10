const express = require("express");
const Pendings = require("../models/pendingList");
const router = express.Router();

//Request service provider for job
router.route("/:username")
    .post((req, res, next) => {
        let pendings = new Pendings(req.body);
        pendings.customerID = req.params.username;
        pendings.serviceID = req.user.id;
        pendings.save()
            .then((pendings) => {
                res.statusCode = 201;
                res.json(pendings);
            }).catch(next);
    });

//GET pending list of service provider
router.route("/")
    .get((req, res, next) => {
        Pendings.find({ customerID: req.user.username })
            .populate("serviceID", "username")
            .then((pendings) => {
                res.json(pendings);
            })
            .catch(next);
    });

module.exports = router;