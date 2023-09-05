const Contact = require("../../models/contact")

async function getAll(req, res, next) {
    try {
        const docs = await Contact.find({owner: req.user.id}).exec();
        res.status(200).send(docs);
    } catch (err) {
        next(err)
    }
}

module.exports = getAll;