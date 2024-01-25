const { Router } = require('express')
const productModel = require('../Dao/models/product.model')
const router = Router()
const productService = require('../services/productService')
const { v4: uuidv4 } = require('uuid') // - plus - importo la biblioteca para autogenerar id's //

    router.get('/', async (req, res) => {     // para obtener todos los productos, basandome en la entrega anterior
        try {
        const products = await productService.getProducts()
        res.json({ products })
        } 
        catch (error) {
        console.error('Error al obtener productos:', error.message)
        res.status(500).json({ error: 'Error al obtener productos' })
        }
    })

    router.get('/:pid', async (req, res) => {
        const productId = req.params.pid
      
        try {
          const product = await productService.getProductById(productId)
      
          if (product) {
            res.json({ product })
          } else {
            res.status(404).json({ error: 'Producto no encontrado' })
          }
        } 
            catch (error) {
          console.error('Error al obtener producto por ID:', error.message)
          res.status(500).json({ error: 'Error al obtener producto por ID' })
            }
      })

    router.post('/', async (req, res) => {
        const productData = req.body
      
        try {
          const newProduct = await productService.addProduct(productData)
          res.json({ message: 'Producto agregado', product: newProduct })
        } 
            catch (error) {
          console.error('Error al agregar producto:', error.message)
          res.status(500).json({ error: 'Error al agregar producto' })
            }
      })
      
    router.put('/:pid', async (req, res) => {
        const productId = req.params.pid
        const updatedData = req.body
      
        try {
          const updatedProduct = await productService.updateProduct(productId, updatedData)
          res.json({ message: 'Producto actualizado', product: updatedProduct })
        } 
            catch (error) {
          console.error('Error al actualizar producto:', error.message)
          res.status(500).json({ error: 'Error al actualizar producto' })
            }
    })
      
    router.delete('/:pid', async (req, res) => {
        const productId = req.params.pid
      
        try {
          const deletedProduct = await productService.deleteProduct(productId)
          res.json({ message: 'Producto eliminado', product: deletedProduct })
        } 
        catch (error) {
          console.error('Error al eliminar producto:', error.message)
          res.status(500).json({ error: 'Error al eliminar producto' })
        }
    })

module.exports = router