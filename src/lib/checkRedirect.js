// Middleware that checks if the "redirect"
// query param is set to true
function CheckRedirect(req, res, next) {
    res.locals.shouldRedirect = req.query.redirect === "true";
    next();
}

module.exports = { CheckRedirect };
