const User = require("../../models/user");
const sendEmail = require("../../helpers/sendEmail");

async function secondVerify(req, res, next) {
    const { email } = req.body;
    try {
        const user = await User.findOne({email}).exec();
        if (user === null ) {
            return res.status(401).send({message: "Email or password is wrong"});
        }
        if (!user.verify) {
            const { verificationToken } = user;
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
            return res.status(200).send({ message: "Verification email sent" });
        } else {
            return res.status(400).send({ message:"Verification has already been passed" });
        }
    } catch(err) {
        next(err);
    }
}

module.exports = secondVerify;