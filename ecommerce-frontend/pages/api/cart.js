import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
    await mongooseConnect();

    const { ids } = req.body;
    const products = await Product.find({ _id: ids });
    res.status(200).json(products);
}