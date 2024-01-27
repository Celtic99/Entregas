const mongoose = require('mongoose')

const cartCollection = 'cart'
const cartSchema = new mongoose.Schema({
    products: [
        {
          product: {
            type: String, 
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
})

const cartModel = mongoose.model(cartCollection, cartSchema)

module.exports = cartModel