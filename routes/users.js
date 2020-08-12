const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();
const auth = require("../auth");
const ServiceAds = require("../models/serviceAds");
const Feedbacks = require("../models/feedbacks");
const HiredList = require("../models/hiredList");
const Wishlist = require("../models/wishlist");
const wishlist = require("../models/wishlist");

//registration
router.post("/register", (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 7, (err, hash) => {
        console.log(err);
        if (err) {
            let err = new Error("Could not hash");
            err.status = 500;
            return next(err);
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender,
            password: hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({
                status: "Registered successfully",
                token: token
            });
        }).catch(next);
    });
});

//login
router.post("/login", (req, res, next) => {
    User.findOne({
        username: req.body.username
    }).then((user) => {
        if (user == null) {
            let err = new Error("User not found");
            err.status = 401;
            return next(err);
        } else {
            bcrypt.compare(req.body.password, user.password).then((isMatch) => {
                if (!isMatch) {
                    let err = new Error("Password doesn't match. Try again!");
                    err.status = 401;
                    return next(err);
                }
                let token = jwt.sign({
                    _id: user._id
                }, process.env.SECRET);
                res.json({
                    status: "Login successful",
                    token: token
                });
                console.log(token);
            }).catch(next);
        }
    }).catch(next);
});

//Search by firstname
router.route("/profile/:firstletter")
    .get((req, res, next) => {
        var firstletter = req.params.firstletter;
        User.find({ username: { $regex: '^' + firstletter, $options: 'i' } })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                next(err);
            });
    });

//Get by username
router.route("/profileByUsername/:username")
    .get((req, res, next) => {
        User.findOne({ username: req.params.username })
            .then((user) => {
                res.json({
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    address: user.address,
                    email: user.email,
                    phone: user.phone
                });
            })
            .catch((err) => {
                next(err);
            });
    });

//Get profile
router.get("/profile", auth.verifyUser, (req, res, next) => {
    res.json({
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        address: req.user.address,
        username: req.user.username,
        email: req.user.email,
        phone: req.user.phone
    });
});

//Update and delete by ID
router.route("/profile/:id", auth.verifyUser)
    .put((req, res, next) => {
        User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then((reply) => {
                console.log(req.params._id)
                if (reply == null) throw new Error("User not found");
                res.json(reply);
            }).catch(next);
    })
    //Delete every data of user
    .delete((req, res, next) => {
        User.findOneAndDelete({ _id: req.params.id })
            .then((user) => {
                if (user == null) {
                    throw new Error("User not found");
                } else {
                    Feedbacks.findOneAndDelete({ commentBy: req.params.id })
                        .then((feedbacks) => {
                            console.log(feedbacks);
                        }).catch(next)
                    Wishlist.findOneAndDelete({ username: user.username })
                        .then((wishlist) => {
                            console.log(wishlist);
                        }).catch(next)
                    ServiceAds.findOneAndDelete({ adOwner: req.params.id })
                        .then((serviceAds) => {
                            console.log(serviceAds);
                        }).catch(next)
                    HiredList.findOneAndDelete({ hiredBy: req.params.id })
                        .then((hiredList) => {
                            console.log(hiredList);
                        }).catch(next)
                    res.json(user);
                }
            }).catch(next);
    });

module.exports = router;