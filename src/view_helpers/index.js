export function toggleClass(val, classTrue, classFalse) {
    return val === 'true' ? classTrue : classFalse;
};

export function isAdmin(user, options) {
    if (user.role == 'ADMIN') {
        return options.fn(user);
    }
    return options.inverse(user);
};
