import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";


export default function ProductForm({
    _id,
    images: existingImages,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    category: assignedCategory,
    properties: assignedProperties
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [description, setDescription] = useState(existingDescription || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [category, setCategory] = useState(assignedCategory || '');

    const [goToProducts, setGoToProducts] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

    const [categories, setCategories] = useState([]);

    const [productProperties, setProductProperties] = useState(assignedProperties || {});

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }, []);

    const saveProduct = async (event) => {
        event.preventDefault();
        const data = {
            title, description,
            price, images,
            category,
            properties: productProperties
        };

        if (_id) {
           /** Update */ 
            await axios.put('/api/products', {...data, _id});
        } else {
            /** Create */
            await axios.post('/api/products', data);
        }

        setGoToProducts(true);
        
    }

    if (goToProducts) {
         router.push('/products')
    }

    const uploadImages = async (event) => {
        const files = event.target?.files;
        
        if (files?.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            
            for (const file of files) {
                data.append('file', file);
            }

            const res = await axios.post('/api/upload', data, {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            setImages(oldImages => {
                return [...oldImages, ...res.data.links];
            });
            setIsUploading(false);
        }
    }

    const updateImagesOrder = (images) => {
        setImages(images)
    }

    /**
     * ! CHECK CATEGORY INFORMATION
     */

    const propertiesToFill = [];

    if (categories.length > 0 && category) {
        let catInfo = categories.find(({ _id }) => _id === category);
        propertiesToFill.push(...catInfo.properties);
        
        while (catInfo?.parent?._id) {
            const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
            propertiesToFill.push(...parentCat.properties);
            catInfo = parentCat;
        }
    }

    const setProductProp = (propName, value) => {
        setProductProperties(prev => {
            const newProductProps = { ...prev };
            newProductProps[propName] = value;
            return newProductProps;
        })
    }

    return(
            <form onSubmit={saveProduct}>
            <label htmlFor="product-name">Product Name:</label>
            <input
                type="text"
                id="product-name"
                placeholder="product name..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <label>Category</label>
            <select
                value={category}
                onChange={event => setCategory(event.target.value)}
            >
                <option value="">Uncategorized</option>
                {categories.length > 0 && categories.map(category => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                ))}
            </select>

            {categories.length > 0 && propertiesToFill.map((p, index) => (
                <div key={index}>
                    <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
                    <div>
                    <select
                        value={productProperties[p.name]}
                        onChange={event => setProductProp(p.name, event.target.value)}>
                        {p.values.map(value => (
                            <option value={value}>{value}</option>
                        ))}
                    </select>
                    </div>
                </div>
            ))}

            <label htmlFor="images">Photos</label>
            <div className="mb-2 flex flex-wrap gap-4" id="images">
                <ReactSortable
                    className="flex flex-wrap gap-1"
                    list={images}
                    setList={updateImagesOrder}
                >
                    {!!images?.length && images.map(link => (
                        <div key={link} className="h-24 bg-white p-4 border border-gray-200 shadow-sm rounded-sm">
                            <img className="rounded-lg" src={link} alt="" />
                        </div>
                    ))}
                </ReactSortable>
                
                {isUploading && (
                    <div className="h-24 p-1 rounded-lg flex items-center">
                        <Spinner />
                    </div>
                )}
                <label className="w-24 h-24 cursor-pointer flex flex-col justify-center items-center gap-1 text-primary text-sm rounded-lg bg-white border border-gray-200 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                    </svg>
                    <p>Add Image</p>
                    <input
                        type="file"
                        className="hidden"
                        onChange={uploadImages}
                    />
                </label>
                
            </div>
            <label htmlFor="description">Product Description:</label>
            <textarea
                name="description"
                id="description"
                placeholder="description..."
                value={description}
                onChange={event => setDescription(event.target.value)}
            ></textarea>
            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                placeholder="price..."
                value={price}
                onChange={(event) => setPrice(event.target.value)}
            />
            <button className="btn-primary" type="submit">save product</button>
            </form>
    )
}