import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";

import Layout from "@/components/Layout";


function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);

    const fetchCategories = () => {
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
            console.log(result.data)
        })
    }

    const saveCategory = async (event) => {
        event.preventDefault();

        const data = {
            name,
            parentCategory,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(',')
            }))
        };
        
        if (editedCategory) {
            await axios.put('/api/categories', {
                ...data,
                _id: editedCategory._id
            });
            setEditedCategory(null);
        } else {
            await axios.post('/api/categories', {
                name,
                parentCategory,
                properties: properties.map(p => ({
                    name: p.name,
                    values: p.values.split(',')
                }))
            });
        }
        setName('');
        setParentCategory('');
        setProperties([]);

        fetchCategories();
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const editCategory = (category) => {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id)
        setProperties(
            category.properties.map(({ name, values }) => ({
                name,
                values: values.join(',')
            }))
        )
    }

    const deleteCategory = (category) => {
        swal.fire({
            title: 'Are you sure?',
            text: `Do you want to delete ${category.name}?`,
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes, Delete!',
            reverseButtons: true,
            confirmButtonColor: '#d55'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { _id } = category;
                await axios.delete('/api/categories?_id=' + _id);
                fetchCategories();
            }
        })
    }

    const addProperty = () => {
        setProperties(prev => {
            return [...prev, { name: '', values: ''}]
        })
    }

    const handlePropertyNameChange = (index, property, newName) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].name = newName;
            return properties;
        })
    }

    const handlePropertyValueChange = (index, property, newValue) => {
        setProperties(prev => {
            const properties = [...prev];
            properties[index].values = newValue;
            return properties;
        })
    }

    const removeProperty = (indexToRemove) => {
        setProperties(prev => {
            return [...prev].filter((property, propertyIndex) => {
                return propertyIndex != indexToRemove;
            })
        })
    }



    return (
        <Layout>
            <h1>Categories</h1>
            <label>
                {editedCategory ? `Edit category ${editedCategory.name}` : 'Create new category'}
            </label>
            <form
                onSubmit={saveCategory}>
                <div className="flex gap-1">
                <input
                    type="text"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder="Category name..." />
                <select
                    value={parentCategory}
                    onChange={event => setParentCategory(event.target.value)}
                >
                    <option value="0">No parent category</option>
                    {categories.length > 0 && categories.map(category => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>
                </div>
                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperty}
                        type="button"
                        className="text-sm btn-default mb-2">Add new property</button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div className="flex gap-1 mb-2">
                            <input
                                type="text"
                                className="mb-0"
                                value={property.name}
                                onChange={(event)=> handlePropertyNameChange(index, property, event.target.value)}
                                placeholder="Property name (example: color)" />
                            <input
                                type="text"
                                className="mb-0"
                                onChange={(event)=> handlePropertyValueChange(index, property, event.target.value)}
                                value={property.values}
                                placeholder="values, comma separated" />
                            <button
                                type="button"
                                onClick={() => removeProperty(index)}
                                className="btn-default">Remove</button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-1">
                    {editedCategory && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditedCategory(null);
                                setName('');
                                setParentCategory('');
                                setProperties([]);
                            }}
                            className="btn-default">Cancel
                        </button>
                    )}
                    <button type="submit" className="btn-primary py-1">Save</button>
                </div>
            </form>
            {!editedCategory && (
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.parent?.name}</td>
                            <td>
                                <button
                                    className="btn-primary"
                                    onClick={() => editCategory(category)}
                                >Edit</button>
                                <button
                                    onClick={() => deleteCategory(category)}
                                    className="btn-delete ml-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </Layout>
    )
}

export default withSwal(({ swal }, ref) => (
    <Categories swal={swal} />
) )

