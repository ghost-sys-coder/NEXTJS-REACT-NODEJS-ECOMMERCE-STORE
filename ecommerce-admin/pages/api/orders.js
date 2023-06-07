import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    await mongooseConnect();
    const ordersDoc = await Order.find().sort({createdAt: -1});
    res.status(200).json(ordersDoc);
}