const Contact = require("../../models/contact");


async function remove(req, res, next) {
    const {id} = req.params;
    try {
        const doc = await Contact.findByIdAndRemove(id).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`})
        } else {
            res.status(204).end();
        }
    } catch (err) {
        next(err);
    }
}

module.exports = remove;