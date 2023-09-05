const create = require("./createContact");
const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const update = require("./updateContact");
const updateStatus = require("./updateStatus");
const remove = require("./removeContact");


module.exports = {
    create,
    getAll,
    getById,
    update,
    updateStatus,
    remove
}