import { Schema, model } from "mongoose";

const collection = "messages"
const messageSchema = new Schema({

    user:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }

},{ timestamps:true, versionKey:false });

const messageModel = model(collection, messageSchema);

export default messageModel;