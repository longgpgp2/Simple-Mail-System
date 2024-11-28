function ensureAuthenticated(req, res, next) {
    if (req.cookies.user) {
        return next();
    }
    res.redirect('/signin');
}

function redirectIfAuthenticated(req, res, next) {
    if (req.cookies.user) {
        res.redirect('/inbox');
    }
    else {
        return next();
    }
}

module.exports = { ensureAuthenticated, redirectIfAuthenticated };