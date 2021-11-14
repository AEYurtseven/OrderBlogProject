const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
     orderTitle: {
        type: String,
        required: true
      },
      orderDescription: {
        type: String
      },
      orderMarkDown: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('Order', orderSchema)