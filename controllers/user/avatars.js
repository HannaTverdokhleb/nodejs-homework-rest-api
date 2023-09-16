const path = require("node:path");
const crypto = require("node:crypto");
const Jimp = require("jimp");
const User = require("../../models/user");



async function uploadAvatar(req, res, next) {
    console.log(req.file);
    
    try {
        const extname = path.extname(req.file.originalname);
        const basename = path.basename(req.file.originalname, extname);
        const suffix = crypto.randomUUID();
        const name = `${basename}-${suffix}${extname}`;

        const savedImagePath = path.join(__dirname, '../..', 'public', 'avatars', name);
        const image = await Jimp.read(req.file.path);
        image.resize(250, 250).write(savedImagePath);

        const avatarURL = `/avatars/${name}`;
        const doc = await User.findByIdAndUpdate(req.user.id, { avatarURL }, { new: true }).exec();

        if (doc === null) {
            return res.status(404).send({ message: "User not found" })
        }
        res.status(200).send({ avatarUrl: doc.avatarURL });
    } catch(err) {
        next(err);
    }
}

module.exports = uploadAvatar;