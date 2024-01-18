const { Router } = require('express')
const router = Router()
const CartManager = require('../Dao/models/cartManager')
const cartManager = new CartManager('../data/carts.json')
const { v4: uuidv4 } = require('uuid')

const carts = []          // AHORA APLICO LAS PETICIONES HTTP

router.post('/', (req,res) =>{
        const cartId = uuidv4()     // genero una id para mi carrito
        const newCart = {
            id: cartId,
            products: []
        }
    // ahora lo guardo
        cartManager.createCart(newCart);
        res.json({ message: 'Nuevo carrito', cart: newCart });
})

router.get('/:cid', (req, res) => {
    const cartId = req.params.cid
    const cart = cartManager.getCart(cartId)
    // si el carrito no existe
    if (!cart) {
        return res.status(404).json({ error: 'El carrito con la id'+ cartId + 'no existe' })
    }
    // si el carrito existe
    const cartProducts = cart.products
    res.json({ cartId, products: cartProducts })
})

router.post('/:cid/product/:pid', (req,res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = req.body.quantity || 1
    const cart = cartManager.getCart(cartId)

    if (!cart) {
        return res.status(404).json({ error: 'El Carrito con la id ' + cartId + ' no existe' });
    }

        // verificar si el producto ya existe en el carrito
    const existingProductIndex = cart.products.findIndex(product => product.id === productId);

    if (existingProductIndex !== -1) {
        // si el producto ya esta en el carrito, le sumo otro
        cart.products[existingProductIndex].quantity += quantity;
    }
    if(!existingProductIndex){
        // si el producto no esta en el carrito, lo agrego
        cart.products.push({
            product: productId,
            quantity: quantity
        });
    }
    // actualizo el carrito con los cambios
    cartManager.updateCart(cart)
    res.json({ message: 'Producto agregado al carrito', cart: cart })

})


module.exports = router