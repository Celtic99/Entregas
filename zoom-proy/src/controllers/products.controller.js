import { Router } from "express";
import productModel from "../DAO/models/products.model.js";

const productsRouter = Router()

productsRouter.get("/", async(req, res)=>{

    try {

        const allProducts = await productModel.find();
        res.status(200).json( { payload:allProducts, msj:"productos obtenidos" } )
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }



});

productsRouter.get("/:id", async(req, res)=>{

    try {

        const id = req.params.id;
        const product = await productModel.findOne({ _id:id });
        res.status(200).json( { payload:product, msj:`producto: ${id} obtenido` } )
        
    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }



});

productsRouter.post("/", async(req, res)=>{

    try {

        const body = req.body;
        const newProduct = await productModel.create(body);
        res.status(200).json({ payload:newProduct, msj:"producto creado!" });

    } catch (err) { res.status(400).json({err:`Surgio un error: ${err}`}) }

});



export default productsRouter;