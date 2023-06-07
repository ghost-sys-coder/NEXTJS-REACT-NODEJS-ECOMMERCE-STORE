import mongooseConnect from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";



export default async function handle(req, res) {
    const { method } = req;

    await mongooseConnect();
    
    await isAdminRequest(req, res);


    if (method === "POST") {
        const { name, parentCategory, properties } = req.body;

        const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            properties
        });
        res.status(200).json(categoryDoc);
    }

    if (method === 'GET') {
        const categories = await Category.find().populate('parent');
        res.status(200).json(categories);
    }

    if (method === 'PUT') {
        const { name, parentCategory, properties, _id } = req.body;

        const updatedCategoryDoc = await Category.updateOne({_id},{
            name, 
            parent: parentCategory || undefined,
            properties
        });
        res.status(200).json(updatedCategoryDoc)
    }

    if (method === "DELETE") {
        const { _id } = req.query;
        const deletedCategory = await Category.deleteOne({ _id });
        res.status(200).json('category deleted');
    }
}