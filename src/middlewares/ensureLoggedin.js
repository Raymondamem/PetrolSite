const ensureLoggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/signin')
    }
    next()
}
module.exports = ensureLoggedin;