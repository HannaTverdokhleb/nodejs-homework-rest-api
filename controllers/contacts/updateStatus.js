const Contact = require("../../models/contact");


async function updateStatus(req, res, next) {
    const {id} = req.params;
    const newStatus =  {
        favorite: req.body.favorite
    };
    try {
        const doc = await Contact.findByIdAndUpdate(id, newStatus, {new: true}).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`});
        } else {
            res.status(200).send(doc);
        }
    } catch(err) {
        next(err)
    }
}

module.exports = updateStatus;