const Contact = require("../../models/contact");


async function update(req, res, next) {
    const {id} = req.params;
    const contact =  {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        favorite: req.body.favorite
    };
    try {
        const doc = await Contact.findByIdAndUpdate(id, contact, {new: true}).exec();
        if (doc === null) {
            res.status(404).send({message: `Contact with id ${id} is not found`});
        } else {
            res.status(201).send(doc);
        }
    } catch(err) {
        next(err)
    }
}

module.exports = update;