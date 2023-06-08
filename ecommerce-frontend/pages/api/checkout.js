import Stripe from "stripe";

import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.json('should be a POST request...');
        return;
    }

    const {
        name, email, city,
        postalCode, streetAddress,
        country, cartProducts } = req.body;
    
    await mongooseConnect();
    
    const productIds = cartProducts;

    const uniqueIds = [...new Set(productIds)];
    const productsInfo = await Product.find({ _id: uniqueIds });
    
    let line_items = [];

    for (const productId of uniqueIds) {
        const productInfo = productsInfo.find(p => p._id.toString() === productId);
        const quantity = productIds.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                quantity,
                price_data: {
                    currency: 'ugx',
                    product_data: { name: productInfo.title },
                    unit_amount: productInfo.price * 100,
                },
                adjustable_quantity: {
                    enabled: true,
                    minimum: 1
                }
            })
        }
    }

    const orderDoc = await Order.create({
        line_items, name, email,
        city, postalCode,
        streetAddress, country, paid: false
    });

    const session = await stripe.checkout.sessions.create({
        line_items,
        submit_type: 'pay',
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/success',
        cancel_url: process.env.PUBLIC_URL + '/cancel',
        metadata: { orderId: orderDoc._id.toString(), test: 'ok' }
    });


    res.json({
        url: session.url
    })

}