import mongoose from "mongoose";

const connectMongo = async() => {

    try {
        
       await mongoose.connect("mongodb+srv://admin:admin@database-coder.bqpwvpv.mongodb.net/");
       console.log("Conexion Exitosa");
        
    } catch (error) { console.log(` Conexion fallida: ${error} `) };

}

export default connectMongo;