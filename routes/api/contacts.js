const express = require('express')
const { routeGetAll, routeGetById, routePostContact, routeDeleteContact, routePutContact } = require('../../controllers/contacts')


const router = express.Router()

router.get('/', routeGetAll)

router.get('/:contactId', routeGetById)

router.post('/', routePostContact)

router.delete('/:contactId', routeDeleteContact)

router.put('/:contactId', routePutContact)


module.exports = router
