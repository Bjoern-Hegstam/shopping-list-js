"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {
    res.session.userId = 42;
});

module.exports = router;