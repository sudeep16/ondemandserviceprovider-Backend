const express = require("express");
const Feedbacks = require("../models/feedbacks");
const router = express.Router();

router.route("/")
    .get((req, res, next) => {
        Feedbacks.find()
            .populate("commentBy", ["firstName", "lastName"])
            .then((feedbacks) => {
                res.json(feedbacks);
            })
            .catch((err) => {
                next(err);
            });
    });

router.route("/:username")
    .post((req, res, next) => {
        let feedbacks = new Feedbacks(req.body);
        feedbacks.commentBy = req.user._id;
        feedbacks.commentOn = req.params.username;
        feedbacks.save()
            .then((feedbacks) => {
                res.statusCode = 201;
                res.json(feedbacks);
            }).catch(next)
    })

module.exports = router;