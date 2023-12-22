const fs = require('fs')
const { v4: uuidv4 } = require('uuid')

class CartManager {
    #id = 1
    path

    constructor(filePath) {
        this.path = filePath
    }

    saveCarts(data){
        fs.writeFileSync(this.path, JSON.stringify(data))
    }

    readCarts(){
        const fileContent = fs.readFileSync(this.path, 'utf-8')
        return JSON.parse(fileContent) || []
    }

    addCart(cart){
        const allCarts = this.readCarts()
        const cartId = uuidv4()
        newCart.id = cartId
        allCarts.push(newCart)
        this.saveCarts(allCarts)
        return newCart
    }

    getCart(cartId) {
        return this.readCarts().find(cart => cart.id === cartId) || null
    }

    updateCart(updatedCart) {
        const allCarts = this.readCarts()
        const index = allCarts.findIndex(cart => cart.id === updatedCart.id)
        if (index !== -1) {
            allCarts[index] = updatedCart
            this.saveCarts(allCarts)
            return true
        } 
        else{
            return false
        }
    }
}

module.exports = CartManager
