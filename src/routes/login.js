"use strict";

const debug = require('debug')('login');

import models from "../models";
import express from "express";
const router = express.Router();

import {isLoggedIn, login, logout} from './../user_management';
const User = models.user;

router.get('/', (req, res) => {
    if (isLoggedIn(req)) {
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
                login(req, users[0]);
                res.redirect('/');
            } else {
                req.session.error = 'Login failed';
                res.redirect('/login');
            }
        });
});

router.get('/logout', (req, res) => {
    logout(req);
    res.redirect('/');
});

export default router;
