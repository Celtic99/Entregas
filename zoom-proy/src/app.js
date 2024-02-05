import express from "express";
import connectMongo from "./db/mongo.js";
import router from "./router/index.js";
import hbs from "express-handlebars";

import { Server } from "socket.io"

const app = express();

app.use( express.json() ); //habilitar json
app.use( express.urlencoded({ extended: true }) ); //usar datos de formulario

app.use( express.static("src/public") );

app.engine("handlebars", hbs.engine());
app.set("views", "src/views");
app.set("view engine","handlebars");

connectMongo();
router(app);

const expressServer = app.listen(8080, () => { console.log("Servidor iniciado") });

const io = new Server(expressServer);

io.on("connection", socket => {

    socket.emit("1")

})
