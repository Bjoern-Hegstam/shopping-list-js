"use strict";

var debug = require('debug')('login');

const models = require("models");
const express = require("express");
const router = express.Router();

const userManagement = require('./../user_management');
const User = models.user;

router.get('/', (req, res) => {
    if (userManagement.isLoggedIn(req)) {
        res.redirect('/shopping-list');
    } else {
        debug('Need to log in');
        res.redirect('/login');
    }
});

router.get('/register', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
        return;
    }

    res.render('register');
});

router.post('/register', (req, res) => {
    User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            verified: false,
            role: 'USER'
        })
        .then(user => {
            req.session.info = 'User created. Verification by admin needed before login possible.';
            res.redirect('/login');
        });
});

router.get('/login', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.post('/login', (req, res) => {
    if (!req.body.username) {
        res.redirect('/');
        return;
    }

    User.findAll({
            where: {
                username: req.body.username
            }
        })
        .then(users => {
            if (users.length == 1 &&
                users[0].isCorrectPassword(req.body.password) &&
                users[0].verified) {
                debug('Logging in');
                userManagement.login(req, users[0]);
                res.redirect('/');
            } else {
                req.session.error = 'Login failed';
                res.redirect('/login');
            }
        });
});

router.get('/logout', (req, res) => {
    userManagement.logout(req);
    res.redirect('/');
});

module.exports = router;
