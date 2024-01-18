const { Router } = require('express')
const router = Router()
const ProductManager = require('../Dao/models/productmanager')
const productManager = new ProductManager("src/data/products.json")
const { v4: uuidv4 } = require('uuid') // - plus - importo la biblioteca para autogenerar id's //

const products = []    // AHORA APLICO LAS PETICIONES HTTP

router.get('/', (req, res) => {     // para obtener todos los productos, basandome en la entrega anterior
    const limit = req.query.limit
    const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts()
    res.json({ products })
    })

router.get('', (req, res) => {      // para obtener el producto mediante la id, basandome en la entrega anterior
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductById(productId)
    if (product) {
        res.json({ product })
    } 
    if(!product) {
        res.status(404).json({ error: 'Producto no encontrado' })
    }
})

router.post('/', (req, res) => {        // este es para agregar un objeto de un recurso, en este caso un producto
    const productdata = req.body  // - obtener los datos desde el body - //
    const generatedId = uuidv4()                  // - plus - como quiero que me se autogenere y que no sea el mismo id, voy a usar una biblioteca, en este caso uui - //
    productdata.status = productdata.status !== undefined ? productdata.status : true;
    const requiredfields = ['title', 'description', 'code', 'price', 'stock', 'category']       // - array en cual tiene los datos que estan en productos - //
        if (productdata.thumbnails && !Array.isArray(productdata.thumbnails)) {
            return res.status(400).json({ error: 'El campo thumbnails debe ser un array de strings' })
        }
    const incompletefields = requiredfields.filter(field => !productdata[field]) 
        if (incompletefields.length > 0) {
            return res.status(400).json({ error: 'Tenes que completar todos los campos', incompletefields })  // - me devuelve todos los campos que no completo - //
         }
    const newProduct = {
        id: generatedId,
        ...productdata
    }
    res.json({message: 'Producto generado', productId: generatedId})
})

router.put('/:pid', (req, res) => {      // este es para actualizar recursos, en este caso un producto  
    const productId = req.params.pid
    const productdata = req.body

    // 1ero.. el producto existe?
    const existingProduct = productManager.getProductById(productId)
    if (!existingProduct){
        return res.status(404).json({error: 'El producto no existe'})
    }

    // si existe..quiero actualizarlo 
    if (productdata.title){
        existingProduct.title = productdata.title
    }
    if (productdata.description){
        existingProduct.description = productdata.description
    } 
    if (productdata.code){
        existingProduct.code = productdata.code
    } 
    if (productdata.price){
        existingProduct.price = productdata.price
    } 
    if (productdata.stock){
        existingProduct.stock = productdata.stock
    } 
    if (productdata.category){
        existingProduct.category = productdata.category
    } 

    // ahora subo todo lo que actualice 
    productManager.updateProduct(existingProduct)
    res.json({ message: 'Producto actualizado', product: existingProduct })
})

router.delete('/:pid', (req, res) => {       // este es para eliminar un recurso, en este caso un producto
    const productId = req.params.pid

    // hago lo mismo que en el anterior.. verifico si existe 
    const existingProduct = productManager.getProductById(productId)
    if (!existingProduct){
        return res.status(404).json({error: 'El producto no existe'})
    }

    // si existe.. lo quiero eliminar
    productManager.delete(productId)

    res.json({ message: 'Producto eliminado', product: existingProduct })
})

module.exports = router