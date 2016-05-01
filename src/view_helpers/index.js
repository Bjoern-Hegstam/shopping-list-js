exports.toggleClass = (val, classTrue, classFalse) => {
    return val === 'true' ? classTrue : classFalse;
};

exports.isAdmin = (user, options) => {
    if (user.role == 'ADMIN') {
        return options.fn(user);
    }
    return options.inverse(user);
};
