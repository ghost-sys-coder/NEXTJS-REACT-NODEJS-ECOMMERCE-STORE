import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import { buffer } from "micro/types/src/lib";
import { Order } from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    await mongooseConnect();

    const endpointSecret = "whsec_58b7e0855c977d821b1ed3a2a656e81bd655695b98eb9134ad9be9cf29639aea";

    const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentData = event.data.object;
      const orderId = paymentData.metadata.orderId;
      const paid = paymentData.payment_status === 'paid';
      
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true
        })
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

}

//acct_1NErJQCMTaG2WfF3

export const config = {
    api: {bodyParser: false}
}