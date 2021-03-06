const express = require("express");
const HiredList = require("../models/hiredList");
const router = express.Router();

//Hire service ad
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

//GET pending list    
router.route("/pending")
    // let pendingCount = db.HiredList.count({ hiredUsername: req.user.username })
    .get((req, res, next) => {
        HiredList.find({ hiredUsername: req.user.username })
            .populate("hiredBy", "username")
            .then((hiredList) => {
                res.json(hiredList);
            })
            .catch(next);
    });

//Total number of pending
router.route("/pendingCount")
    .get((req, res, next) => {
        HiredList.countDocuments({ hiredUsername: req.user.username })
            .then((hiredList) => {
                res.json(hiredList);
            })
            .catch(next);
    })

//Delete pending request
router.route("/deleteHiredlist/:id")
    .delete((req, res, next) => {
        HiredList.findOneAndDelete({ _id: req.params.id })
            .then((hiredList) => {
                res.json(hiredList)
            }).catch(next);
    })

module.exports = router;