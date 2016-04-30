"use strict";

const models = require("models");
const express = require("express");
const router = express.Router();

const userManagement = require('./../user_management');
const User = models.user;

router.get('/', (req, res) => {
    console.log(res.locals);

    if (req.session.userId) {
        res.redirect('/shopping-list');
    } else {
        console.log('Need to log in');
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
            confirmed: false,
            role: 'USER'
        })
        .then(user => {
            res.redirect('/');
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
            if (users.length == 1 && users[0].password == req.body.password) {
                console.log('Logging in');
                userManagement.login(req, users[0]);
            } else {
                req.session.error = 'Login failed';
                res.redirect('/login');
            }

        }, err => {
            res.render('/login', {
                error: {
                    message: 'Something went wrong, please try again'
                }
            });
        });
});

router.get('/logout', (req, res) => {
    userManagement.logout(req);
    res.redirect('/');
});

module.exports = router;
