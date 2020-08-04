const express = require("express");
const Pendings = require("../models/pendingList");
const router = express.Router();

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

module.exports = router;