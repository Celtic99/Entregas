const express = require('express')
// importo controladores
const productsController = require('../controllers/products.controller')
const cartsController = require('../controllers/carts.controller')
const messagesController = require('../controllers/messages.controller')

const router = app => {
  app.use('/api/products', productsController)
  app.use('/api/carts', cartsController)
  app.use('/messages', messagesController)
}

module.exports = router
