const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/Users");

router.post("/test", (req, res, next) => {
    console.log("OMG OMG OMGOGMOGMEWO FMEW");
    console.log(req.body);
    res.status(200).json({success: `nice`});
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
});

router.post("/register", (req, res, next) => {
    console.log("Registering user...")
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.password);
    if(req.body.email && req.body.username && req.body.password) {
        User.findOne({email: req.body.email})
        .exec(function(err, user) {
            if (err) {
                return res.status(400).json({ errors: err });
            } else if (!user) {
                const userData = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
                User.create(userData, function (err, user) {
                    if (err) {
                      return next(err)
                    } else {
                        console.log("It worked!!");
                        return res.status(200).json({ success: `registered ${user.id}` });
                    }
                });
            } else {
                return res.status(401).json({ errors: "User already exists" });
            }
        })
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})
module.exports = router;