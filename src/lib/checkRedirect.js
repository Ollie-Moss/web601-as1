// Middleware that checks if the "redirect" 
// query param is set to true
function CheckRedirect(req, res, next) {
    if (req.query.redirect === "true") {
        res.locals.shouldRedirect = true;
    }
    next();
}

module.exports = { CheckRedirect };
