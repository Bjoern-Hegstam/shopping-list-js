const models = require("models");
const User = models.user;

exports.login = (req, user) => {
    req.session.userId = user.id;
}

exports.logout = (req) => {
    req.session.destroy();
};

exports.loadUserForSession = (req, res, next) => {
    if (req.session.userId) {
        User.findById(req.session.userId)
            .then(user => {
                res.locals.user = user.toSimpleJSON();
                next();
            }, err => {
                console.log('User error');
            });
    } else {
        next();
    }
};
