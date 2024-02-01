import productsRouter from "../controllers/products.controller.js";

const router = (app) => {

    app.use("/api/products", productsRouter);

}

export default router;