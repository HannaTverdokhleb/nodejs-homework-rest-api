const Contact = require("../../models/contact");


async function create(req, res, next) {
    const contact =  {
        name: req.body.name, 
        email: req.body.email, 
        phone: req.body.phone, 
        favorite: req.body.favorite,
        owner: req.user.id,
    };
    try {
        const doc = await Contact.create(contact)
        res.status(201).send(doc);
    } catch(err) {
        next(err)
    }
}

module.exports = create;