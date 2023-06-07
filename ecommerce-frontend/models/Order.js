import { Schema, model, models } from "mongoose";


const OrderSchema = new Schema({
    line_items: Object,
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    city: {
        type: String,
        // required: true
    },
    postalCode: String,
    streetAddress: {
        type: String,
        // required: true
    },
    country: {
        type: String,
        // required: true
    },
    paid: Boolean
}, {
   timestamps: true 
});


export const Order = models?.Order || model('Order', OrderSchema);