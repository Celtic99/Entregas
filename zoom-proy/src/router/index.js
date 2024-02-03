import cartRouter from "../controllers/carts.controller.js";
import productsRouter from "../controllers/products.controller.js";

const router = (app) => {

    app.use("/api/products", productsRouter);
    app.use("/api/carts", cartRouter);

}

export default router;