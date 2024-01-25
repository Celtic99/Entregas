const { Router } = require('express')
const CartService = require('../services/cartService')
const router = Router()
const cartService = new CartService()

router.post('/', async (req, res) => {
  try {
    const newCart = await cartService.createCart()
    res.json({ message: 'Nuevo carrito', cart: newCart })
  } catch (error) {
    console.error('Error al crear un nuevo carrito:', error.message)
    res.status(500).json({ error: 'Error al crear un nuevo carrito' })
  }
})

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid

  try {
    const cart = await cartService.getCart(cartId)

    if (cart) {
      res.json({ cartId, products: cart.products })
    } else {
      res.status(404).json({ error: `El carrito con la ID ${cartId} no existe` })
    }
  } catch (error) {
    console.error('Error al obtener el carrito por ID:', error.message)
    res.status(500).json({ error: 'Error al obtener el carrito por ID' })
  }
})

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid
  const productId = req.params.pid
  const quantity = req.body.quantity || 1

  try {
    const cart = await cartService.getCart(cartId)

    if (!cart) {
      return res.status(404).json({ error: `El carrito con la ID ${cartId} no existe` })
    }

    const updatedCart = await cartService.addProductToCart(cart, productId, quantity)
    res.json({ message: 'Producto agregado al carrito', cart: updatedCart })
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error.message)
    res.status(500).json({ error: 'Error al agregar producto al carrito' })
  }
})

module.exports = router