const bcrypt = require("bcrypt");

const User = require("../../models/user");


async function register(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
        const user = await User.findOne({ email }).exec()
        if (user !== null) {
            return res.status(409).send({message: "Email in use"})
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const doc = await User.create({ email, subscription, password: passwordHash })
        
        res.status(201).send({user: {
                "email": doc.email,
                "subscription": doc.subscription
            }
        });
    } catch(error) {
        next(error)
    }
}

module.exports = register;