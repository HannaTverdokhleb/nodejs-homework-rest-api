const bcrypt = require("bcrypt");
var gravatar = require("gravatar");
const User = require("../../models/user");
const { v4: uuidv4 } = require('uuid');
const sendEmail = require("../../helpers/sendEmail");


async function register(req, res, next) {
    const { password, email, subscription } = req.body;

    try {
        const user = await User.findOne({ email }).exec()
        if (user !== null) {
            return res.status(409).send({message: 'Email in use'})
        }
        const userAvatar = gravatar.url(email, {protocol: 'https', d: 'identicon'});
        const passwordHash = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();
        const doc = await User.create({ 
            email, 
            subscription, 
            avatarURL: userAvatar, 
            password: passwordHash,
            verificationToken,
        })
        
        await sendEmail({
            to: email,
            subject: `Welcome on board ${email}`,
            html: `<p>Hi! To confirm your registration, please click on link below</p>
            <p>
                <a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm</a>
            </p>`,
            text: `Hi! To confirm your registration, please click on link below\n
            http://localhost:3000/api/users/verify/${verificationToken}
            `,
            
        })

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