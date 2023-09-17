const User = require("../../models/user");

async function verify(req,res,next) {
    const { verificationToken } = req.params;

    try {
        const user = await User.findOne({verificationToken}).exec();
        if (user === null) {
            return res.status(404).send({ message: 'User not found' })
        }
        
        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null }).exec();

        return res.status(200).send({ message: 'Verification successful' });
    } catch(err) {
        next(err);
    }
}

module.exports = verify;