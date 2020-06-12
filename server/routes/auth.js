const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/Users");

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
    if(req.body.email && req.body.username && req.body.password) {
        const userData = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        User.create(userData, function (err, user) {
            if (err) {
              return next(err)
            } else {
              return res.redirect('/profile');
            }
          });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})
module.exports = router;