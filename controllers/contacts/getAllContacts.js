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
        let limit = 0;
        let skip = 0;
        if (req.query.limit > 0) {
            limit = req.query.limit
        }
        if (req.query.page > 0) {
            skip = limit * (req.query.page - 1)
        }
        const docs = await Contact.find(filter).skip(skip).limit(limit).exec();
        res.status(200).send(docs);
    } catch (err) {
        next(err)
    }
}

module.exports = getAll;