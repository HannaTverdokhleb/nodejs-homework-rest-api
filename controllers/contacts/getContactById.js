const Contact = require("../../models/contact")

async function getById(req, res, next) {
    const {id} = req.params;
    try {
        const doc = await Contact.findById(id).exec();
        if (doc === null) {
            return res.status(404).send({message: `Contact with id ${id} is not found`})
        }
    
        if (doc.owner.toString() !== req.user.id) {
            return res.status(403).send({message: "You heve no access to this contact :("})
        }

        res.status(200).send(doc);
        
    } catch (err) {
        next(err);
    }
}

module.exports = getById;