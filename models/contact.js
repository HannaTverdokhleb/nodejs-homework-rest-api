const mongoose = require("mongoose");

const contactschema = new mongoose.Schema({
  name: {
      type: String,
      required: [true, 'Set name for contact'],
  },
  email: {
      type: String,
  },
  phone: {
      type: String,
  },
  favorite: {
      type: Boolean,
      default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  }
})

module.exports = mongoose.model("Contact", contactschema);