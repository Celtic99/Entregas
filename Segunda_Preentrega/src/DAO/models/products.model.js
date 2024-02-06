import { Schema, model } from "mongoose";

const collection = "products"
const productSchema = new Schema({

    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String
    },
    status:{
        type:Boolean,
        required:true,
        default:true

    }
})

const productModel = model(collection, productSchema);

export default productModel;