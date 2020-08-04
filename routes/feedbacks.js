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

router.route("/myfeedbacks")
    .get((req, res, next) => {
        Feedbacks.find({ commentOn: req.user.username })
            .populate("commentBy", ["username"])
            .then((feedbacks) => {
                res.json(feedbacks);
            }).catch(next);
    });

router.route("/myTotalFeedbacksCount")
    .get((req, res, next) => {
        Feedbacks.countDocuments({ commentOn: req.user.username })
            .then((hiredList) => {
                res.json(hiredList);
            })
            .catch(next);
    })

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