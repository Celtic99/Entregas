class ProductManager{  // gestiona un conjunto de productos
    #products = []  //arreglo vacio
    #id = 1 
    
    addProduct(product){
        if(!product.title || !product.description || !product.price || !product.thumbnail ||!product.code || !product.stock)
            return console.log('Complete todos los campos')
    
            const existingProduct = this.#products.find(existingProduct => existingProduct.code === product.code)
            if(existingProduct){
                return console.log('El codigo del producto ya existe')
            }
            
            const productId = this.#id++   //id incrementable
            product.id = productId        // verifico que se le asigne el id al nuevo producto
            
            this.#products.push(product)     // lo subo 
        }
        
        getProducts() {
            return [...this.#products]
        }
        
        getProductById(id){
            const foundProduct = this.#products.find(product => product.id === id) // si product.id es = a id -> guardalo en product.. product = foundproduct 
            if(foundProduct){
                return foundProduct
            }
            if (!foundProduct){
                return console.log('Not found')
            } 
        }
        
    }
    
// if (foundProduct) {
//     return console.log('Producto encontrado:', foundProduct)
// }
// if (!foundProduct){
//     return console.log('Producto no encontrado.');
//   }

// TESTEO 

const prueba = new ProductManager()
console.log('Productos: ', prueba.getProducts())

prueba.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts())

// Y SI LO AGREGO OTRA VEZ ? 

prueba.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts()) // aca deberia saltar que ya existe

// Y SI AGREGO UNO NUEVO 

prueba.addProduct({
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 600,
    thumbnail: 'Sin imagen2',
    code: 'abc666',
    stock: 25,
})

console.log('Producto recientemente agregado: ', prueba.getProducts()) 

//
const productId = 1 
console.log('Producto encontrado:', prueba.getProductById(productId))
