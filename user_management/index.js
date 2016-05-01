const models = require("models");
const User = models.user;

function isLoggedIn(req) {
    return process.env.USER_AUTH_DISABLED || req.session.userId;
}

exports.login = (req, user) => {
    req.session.userId = user.id;
};

exports.isLoggedIn = isLoggedIn;

exports.logout = (req) => {
    req.session.destroy();
};

exports.loadUserForSession = (req, res, next) => {
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
};

exports.authIsLoggedIn = (req, res, next) => {
    if (isLoggedIn(req)) {
        return next();
    }
    res.redirect('/login');
};

exports.authIsAdmin = (req, res, next) => {
    if (res.locals.current_user && res.locals.current_user.role == 'ADMIN') {
        return next();
    }

    res.redirect('/');
};
