"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    console.log('login');
    res.render('login');
});

router.post('/', (req, res) => {
    console.log('Logging in');
    req.session.userId = 42;
    res.redirect('/');
});

module.exports = router;
