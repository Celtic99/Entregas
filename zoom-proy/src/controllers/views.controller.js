import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get("/home", (req, res) => {

    res.status(200).render("home");

});

viewsRouter.get("/info", (req, res) => {

    res.status(200).render("info");

});

viewsRouter.get("/products", (req, res) => {

    res.status(200).render("products");

});

viewsRouter.get("/chat", (req, res) => {

    res.status(200).render("chat");

});

export default viewsRouter;

