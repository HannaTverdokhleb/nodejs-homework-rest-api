const User = require("../../models/user");




async function logout(req, res, next) {
    
    try {
        await User.findByIdAndUpdate(req.user.id, {token: null}).exec()
        res.status(204).end();
    } catch(err) {
        next(err)
    }
    
    res.end()
}

module.exports = logout;