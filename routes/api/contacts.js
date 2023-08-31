const express = require('express')
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const contactSchema = require('../../schemas/contact')


const router = express.Router()

router.get('/', async (_, res, next) => {
  try {
    const list = await listContacts();
    console.log(list)
    res.status(200).json(list)
  } catch(err) {
    next(err)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await getContactById(id)
    if (contact === null) {
      res.status(404).json({ message: 'Not found' })
    } else {
      res.status(200).json(contact)
    }
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error, value } = contactSchema.validate(req.body)
    if (typeof error !== "undefined") {
      res.status(400).send(error.details[0].message)
    } else {
      const { name, email, phone } = value
      const contact = await addContact(name, email, phone)
      console.log(contact)
      res.status(201).send(contact)
    }
  } catch(err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const contact = await removeContact(id)
    if (contact === null) {
      res.status(404).json({ message: 'Not found' })
    } else {
      res.status(200).json({ message: 'Contact deleted' })
    }
  } catch(err) {
    next(err)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId
    const { error, value } = contactSchema.validate(req.body)
    if (typeof error !== "undefined") {
      res.status(400).send(error.details[0].message)
    } else {
      const contact = await updateContact(id, value)
      if (contact === null) {
        res.status(404).json({ message: 'Not found' })
      } else {
        res.status(200).send(contact)
      }
    }
  } catch(err) {
    next(err)
  }
})

module.exports = router
