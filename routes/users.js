const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();
const auth = require("../auth");

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

router.route("/:firstName")
    .get((req, res, next) => {
        User.find({ firstName: req.params.firstName })
            .then((user) => {
                res.json(user);
            })
            .catch((err) => {
                next(err);
            });
    });

module.exports = router;