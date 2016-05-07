import models from "../models";
const User = models.user;


export function login(req, user) {
    req.session.userId = user.id;
}

export function isLoggedIn(req) {
    return process.env.USER_AUTH_DISABLED || req.session.userId;
}

export function logout(req) {
    req.session.destroy();
}

export function loadUserForSession(req, res, next) {
    if (req.session.userId) {
        User.findById(req.session.userId)
            .then(user => {
                res.locals.current_user = user.toSimpleJSON();
                next();
            }, err => {
                console.log('User error');
            });
    } else {
        next();
    }
}

export function authIsLoggedIn(req, res, next) {
    if (isLoggedIn(req)) {
        return next();
    }
    res.redirect('/login');
}

export function authIsAdmin(req, res, next) {
    if (res.locals.current_user && res.locals.current_user.role == 'ADMIN') {
        return next();
    }

    res.redirect('/');
}
