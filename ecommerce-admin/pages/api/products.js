import { Product } from "@/models/Product";


import mongooseConnect from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
    const { method } = req;

    await mongooseConnect();

    await isAdminRequest(req, res);

    if (method === 'GET') {

        if (req.query?.id) {
            res.json(await Product.findById(req.query.id));
        } else {
            res.json(await Product.find());
        }
    }

    if (method === 'POST') {
        const { title, description, price,images, category, properties } = req.body;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            category,
            properties
        });

        res.status(200).json(productDoc);
    }

    if (method === 'PUT') {
        const { title, description, price, images, category, properties, _id } = req.body;
        await Product.updateOne({ _id }, {
            title,
            description,
            price,
            images,
            category,
            properties
        });
        res.status(200).json(true)
    }

    if (method === 'DELETE') {
        const { id } = req.query;
        await Product.findByIdAndDelete(id);
        res.status(200).json(true);
    }
}