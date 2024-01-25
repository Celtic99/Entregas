const CartModel = require('../Dao/models/cart.model')

class CartService {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] })
      await newCart.save()
      return newCart
    } catch (error) {
      console.error('Error al crear un nuevo carrito:', error.message)
      throw error;
    }
  }

  async getCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId)
      return cart
    } catch (error) {
      console.error('Error al obtener el carrito por ID:', error.message)
      throw error;
    }
  }

  async addProductToCart(cart, productId, quantity) {
    try {
      const existingProductIndex = cart.products.findIndex(product => product.id === productId)

      if (existingProductIndex !== -1) {
        //si el producto ya esta en el carrito, se actualiza la cantidad
        cart.products[existingProductIndex].quantity += quantity
      } else {
        //si el producto no esta en el carrito, se agrega
        cart.products.push({
          product: productId,
          quantity: quantity,
        })
      }

      await cart.save() // guardo los cambios en la base de datos

      return cart
    } 
    catch (error) {
      console.error('Error al agregar rl producto al carrito:', error.message)
      throw error;
    }
  }
}

module.exports = CartService