const bcrypt = require("bcrypt");
var gravatar = require("gravatar");
const User = require("../../models/user");


async function register(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
        const user = await User.findOne({ email }).exec()
        if (user !== null) {
            return res.status(409).send({message: 'Email in use'})
        }
        const userAvatar = gravatar.url(email, {protocol: 'https', d: 'identicon'});
        const passwordHash = await bcrypt.hash(password, 10);
        const doc = await User.create({ email, subscription, avatarURL: userAvatar, password: passwordHash })
        
        res.status(201).send({user: {
                "email": doc.email,
                "subscription": doc.subscription,
                "avatarURL": doc.avatarURL
            }
        });
    } catch(error) {
        next(error)
    }
}

module.exports = register;