import express from "express";
import connectMongo from "./db/mongo.js";
import router from "./router/index.js";

const app = express();

app.use( express.json() ); //habilitar json
app.use( express.urlencoded() ); //usar datos de formulario

connectMongo();
router(app)

app.listen(8080, () => { console.log("Servidor iniciado") });
