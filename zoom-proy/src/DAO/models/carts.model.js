import {Schema, Types, model} from "mongoose";

const cartsCollection = "carts";
const cartsSchema = new Schema({

    products:[
        {
            product:{
                type:Types.ObjectId,
                ref:"products"
            },
            quantity:{
                type:Number
            },
            _id:false
        }
    ],
    status:{
        type:Boolean,
        default:true,
        required:true
    },

},{ versionKey:false, timestamps:true });

const cartModel = model(cartsCollection, cartsSchema);

export default cartModel;