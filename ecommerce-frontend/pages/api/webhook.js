import { mongooseConnect } from "@/lib/mongoose";
import Stripe from "stripe";
import { buffer } from "micro/types/src/lib";

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
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
          console.log(paymentIntentSucceeded)
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

}

export const config = {
    api: {bodyParser: false}
}