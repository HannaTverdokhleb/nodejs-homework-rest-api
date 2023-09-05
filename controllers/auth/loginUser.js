const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const JWT_TOKEN = process.env.JWT_SECRET;


async function login(req, res, next) {
    const { password, email } = req.body;
    try {
        const user = await User.findOne({email}).exec();
        if (user === null ) {
            return res.status(401).send({message: "Email or password is wrong"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === false) {
            return res.status(401).send({message: "Email or password is wrong"});
        }

        const token = jwt.sign({
            id: user._id,
        }, 
            JWT_TOKEN, 
        {
            expiresIn: 3600,
        })

        const doc = await User.findByIdAndUpdate(user._id, {token}).exec();

        res.status(200).send({
            "token": token,
            "user": {
              "email": email,
              "subscription": doc.subscription
            }
        });
    } catch(error) {
        next(error)
    }
}

module.exports = login;