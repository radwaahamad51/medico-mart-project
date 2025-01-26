import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "", image: "" });
    const [editingCategory, setEditingCategory] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Fetch categories from the backend
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("https://assignment-12-server-sable-six.vercel.app/medichin-category");
        setCategories(response.data);
    };

    // Handle form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory({ ...newCategory, [name]: value });
    };

    // Add or Update a category
    // const handleSaveCategory = async () => {
    //     if (editingCategory) {
    //         // Update category
    //         await axios.put(
    //             `https://assignment-12-server-sable-six.vercel.app/api/categories/${editingCategory._id}`,
    //             newCategory
    //         );
    //     } else {
    //         // Add new category
    //         await axios.post("https://assignment-12-server-sable-six.vercel.app/api/categories", newCategory);
    //     }

    //     fetchCategories();
    //     setNewCategory({ name: "", image: "" });
    //     setEditingCategory(null);
    //     setModalOpen(false);
    // };



    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const price = form.price.value;
        const quantity = form.quantity.value;
        const image = form.image.value;

        const allValue = {
            name, price, quantity, image
        };
        console.log(allValue)







        fetch(`https://assignment-12-server-sable-six.vercel.app/medichin-category/${editingCategory._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(allValue)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Upadate successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location.state : "/");
            })

    }











    // Delete a category

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://assignment-12-server-sable-six.vercel.app/medichin-category/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your item has been deleted.", "success");
                            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
                        }
                    })
                    .catch((error) => {
                        console.error("Failed to delete the order:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Failed to delete the item. Please try again later.",
                        });
                    });
            }
        });
    };


    // Open modal for editing
    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategory({ name: category.name, image: category.image, quantity: category.quantity, price: category.price });
        setModalOpen(true);
    };


    return (
        <>
            <Helmet>
                <title>
                    Medico | Manage Categories
                </title>
            </Helmet>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

                {/* Add Category Button */}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => setModalOpen(true)}
                >
                    Add Category
                </button>

                {/* Categories Table */}
                <table className="w-full bg-white rounded shadow-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left">#</th>
                            <th className="p-4 text-left">Category Name</th>
                            <th className="p-4 text-left">Image</th>
                            <th className="p-4 text-left">Medicines</th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category._id} className="border-b">
                                <td className="p-4">{index + 1}</td>
                                <td className="p-4">{category.name}</td>
                                <td className="p-4">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="p-4">
                                    <ul className="list-disc pl-5 mt-3 mb-3 p-3">
                                        {category.medicines?.map((medicine, i) => (
                                            <li key={i} className="flex justify-between mb-4">
                                                <div>
                                                    <strong>Name:</strong> {medicine.name}{" "}
                                                    <strong>Qty:</strong> {medicine.quantity}
                                                </div>
                                                <div className="flex gap-2"> <button
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleEditCategory(medicine)}
                                                >
                                                    Edit
                                                </button>
                                                    <button
                                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                                        onClick={() => handleDelete(medicine)}
                                                    >
                                                        Delete
                                                    </button></div>
                                            </li>
                                        ))}
                                    </ul>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Add/Edit Modal */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">
                                {editingCategory ? "Edit Category" : "Add New Category"}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Category Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newCategory.name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Price</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={newCategory.price}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={newCategory.quantity}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">Image URL</label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={newCategory.image}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter image URL"
                                    />
                                </div>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        className="bg-gray-300 px-4 py-2 rounded"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"

                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div></>
    );
};

export default ManageCategory;
