import { Router } from "express";
import productModel from "../DAO/models/products.model.js";

const productsRouter = Router()

productsRouter.get("/", async(req, res)=>{

    try {

        const allProducts = await productModel.find({status:true});
        res.status(200).json( { payload:allProducts, msj:"productos obtenidos" } )
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }



});

productsRouter.get("/:id", async(req, res)=>{

    try {

        const id = req.params.id;
        const product = await productModel.findOne({ _id:id });

        if(product.status === false){ throw new Error("El producto ya no existe") }

        res.status(200).json( { payload:product, msj:`producto: ${id} obtenido` } )
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err.message}`}) }



});

productsRouter.post("/", async(req, res)=>{

    try {

        const body = req.body;
        const newProduct = await productModel.create(body);
        res.status(200).json({ payload:newProduct, msj:"producto creado!" });

    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }

});

productsRouter.put("/:id", async(req, res) => {

    try {

        const id = req.params.id;
        const body = req.body;

        const product = await productModel.findOneAndUpdate( {_id:id}, body );

        res.status(200).json({ payload:product, msj:`producto ${id} eliminado` })
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }

});

productsRouter.delete("/:id", async(req, res) => {

    try {

        const id = req.params.id;
        const deletedProduct = await productModel.findByIdAndUpdate( {_id:id}, { status:false } );

        res.status(200).json({payload:deletedProduct, msj:`producto ${id} eliminado`});
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }

})



export default productsRouter;





/***
 * 
 * Eliminar un elemento permanentemente:
 * 
 * productsRouter.delete("/:id", async(req, res) => {

    try {

        const id = req.params.id;
        const deletedProduct = await productModel.findOneAndDelete( {_id:id} );

        res.status(200).json({payload:deletedProduct, msj:`producto ${id} eliminado`});
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }
 * 
 */