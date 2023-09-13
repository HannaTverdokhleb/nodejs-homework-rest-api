const User = require("../../models/user");


async function current(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const [bearer, ownToken] = authHeader.split(" ", 2);
    
    try {
        const currentUser = await User.findOne({token: ownToken});
        const {email, subscription} = currentUser;
        res.status(200).send({
            "email": email,
            "subscription": subscription
          });

    } catch(err) {
        next(err)
    }
    
}

module.exports = current;