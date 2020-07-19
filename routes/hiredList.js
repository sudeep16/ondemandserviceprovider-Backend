const express = require("express");
const HiredList = require("../models/hiredList");
const router = express.Router();

router.route("/:username")
    .post((req, res, next) => {
        let hiredList = new HiredList(req.body);
        hiredList.hiredBy = req.user._id;
        hiredList.hiredUsername = req.params.username;
        hiredList.save()
            .then((hiredList) => {
                res.statusCode = 201;
                res.json(hiredList);
            }).catch(next)
    })

module.exports = router;