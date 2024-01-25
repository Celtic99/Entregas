const ProductModel = require('../dao/models/product.model')
const mongoose = require('mongoose')

class productService {
  // para obtener todos los productos
  async getProducts() {
    try {
      const products = await ProductModel.find()
      return products
    } 
        catch (error) {
      console.error('Error al obtener productos:', error.message)
      throw error
        }
  }

  //para agregar un nuevo producto
  async addProduct(productData) {
    try {
      const newProduct = new ProductModel(productData)
      await newProduct.save()
      return newProduct
    } 
        catch (error) {
      console.error('Error al agregar un producto:', error.message)
      throw error
        }
  }

  // obtener un producto por id
  async getProductById(productId) {
    try {
      const product = await ProductModel.findById(productId)
      return product
    } 
        catch (error) {
      console.error('Error al obtener un producto por ID:', error.message)
      throw error
        }
  }

  // para actualizar un producto por id
  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productId,
        { $set: updatedData },
        { new: true } 
      )
      return updatedProduct
    } 
        catch (error) {
      console.error('Error al actualizar un producto:', error.message)
      throw error
        }
  }

  async deleteProduct(productId) {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productId)
      return deletedProduct
    } 
        catch (error) {
      console.error('Error al eliminar un producto:', error.message)
      throw error
        }
  }

}

module.exports = productService
