const Contact = require("../../models/contact")

async function getAll(req, res, next) {
    try {
        let filter = {
            owner: req.user.id
        };
        if (req.query.name !== undefined) {
            filter.name = req.query.name
        }
        if (req.query.email !== undefined) {
            filter.email = req.query.email
        }
        if (req.query.favorite !== undefined) {
            filter.favorite = req.query.favorite
        }
        if (req.query.phone !== undefined) {
            filter.phone = req.query.phone
        }
        const docs = await Contact.find(filter).exec();
        res.status(200).send(docs);
    } catch (err) {
        next(err)
    }
}

module.exports = getAll;