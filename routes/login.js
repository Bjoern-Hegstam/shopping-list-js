"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

router.get('/login', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.post('/login', (req, res) => {
    req.session.userId = 42;
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
