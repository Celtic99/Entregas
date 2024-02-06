import {Router} from "express";
import cartModel from "../DAO/models/carts.model.js"
import productModel from "../DAO/models/products.model.js";

const cartRouter = Router();

cartRouter.get("/", async(req, res) => {

    try {

        const allCarts = await cartModel.find({status:true});

        res.status(200).json({ payload:allCarts, msj:"Carritos Obtenidos" })

    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }

});

cartRouter.get("/:id", async(req, res) => {

    try {

        const id = req.params.id;

        const cart = await cartModel.findOne({_id:id}).populate("products.product"); // para que aparezca todos los datos del producto

        if(cart.status === false){ throw new Error("El carrito no existe") }

        res.status(200).json({ payload:cart, msj:"Carrito Obtenido" })

    } catch (err) { res.status(400).json({err:`Surgio un error: ${err.message}`}) }

});

cartRouter.post("/", async(req, res) => {

    try {

        const cart = await cartModel.create({

            products:[],
            status:true
    
        })

        res.status(200).json({payload:cart, msj:"nuevo carrito creado!"})
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err.message}`}) }

})

cartRouter.put("/:cartId/product/:productId", async(req, res) => {

    try {

        const cartId = req.params.cartId;
        const productId = req.params.productId;
    
        const cart = await cartModel.findOne({_id:cartId});
        const product = await productModel.findOne({_id:productId});

        if(!cart.status || !product.status){
            throw new Error("El carrito o el producto no existen")
        };

        const productIndex = cart.products.findIndex( element => element.product.toString() === productId.toString() );

        if(productIndex == -1 ){

            cart.products.push({

                product:productId,
                quantity:1

            })

        }else{

            cart.products[productIndex] = {

                product:productId,
                quantity: cart.products[productIndex].quantity + 1

            }

        };

        await cart.save();

        res.status(200).json({payload:cart, msj: ` producto: ${productId} agregado al carrito ${cartId}` })
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err.message}`}) }

})

cartRouter.delete("/:cartId/product/:productId", async(req, res) => {
    
    try {

        const cartId = req.params.cartId;
        const productId = req.params.productId;
    
        const cart = await cartModel.findOne({_id:cartId});
        const product = await productModel.findOne({_id:productId});

        if(!cart.status || !product.status){
            throw new Error("El carrito o el producto no existen")
        };

        const cartProducts = cart.products.filter( element => element.product.toString() !== productId.toString() );

        cart.products = cartProducts;

        await cart.save();

        res.status(200).json({payload:cart, msj: ` producto: ${productId} agregado al carrito ${cartId}` })

        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err.message}`}) }

})


export default cartRouter;