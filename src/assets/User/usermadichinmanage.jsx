import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ManageMedicines = ({ sellerId }) => {
    const [medicines, setMedicines] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);

    // console.log(user)

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        description: '',
        image: '',
        mg: '',
        company: '',

        originalPrice: 0,
        discount: 0,
        // UserEmail:UserEmail || '', // Dynamically assign the seller ID
        UserEmail: user?.email || "No Email"
    });



    useEffect(() => {
        if (user) {
            axios
                .get(`https://assignment-12-server-sable-six.vercel.app/shop?email=${user.email}`)
                .then((response) => {
                    setMedicines(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching cart data:", error);
                    setLoading(false);
                });
        }
    }, [user]);

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
                fetch(`https://assignment-12-server-sable-six.vercel.app/shop/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your item has been deleted.", "success");
                            setMedicines((prevOrders) => prevOrders.filter((order) => order._id !== id));
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



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://assignment-12-server-sable-six.vercel.app/addshops', formData);
            // Refresh medicines list after adding
            setShowModal(false); // Close the modal
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Medico | Manage Medicines
                </title>
            </Helmet>

            <div>
                <h1 className="text-2xl font-bold mb-4">Manage Medicines</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded mb-4"
                >
                    Add Medicine
                </button>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Item Name</th>
                            <th className="border px-4 py-2">Generic Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Unit</th>
                            <th className="border px-4 py-2">Discount</th>
                            <th className="border px-4 py-2">Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine) => (
                            <tr key={medicine._id}>
                                <td className="border px-4 py-2">{medicine.name}</td>
                                <td className="border px-4 py-2">{medicine.company}</td>
                                <td className="border px-4 py-2">{medicine.price}</td>
                                <td className="border px-4 py-2">{medicine.mg}</td>
                                <td className="border px-4 py-2">{medicine.discount}%</td>
                                <td> <button className="  px-4 py-2 rounded-md  " onClick={() => handleDelete(medicine._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white w-96 p-6 rounded shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Add Medicine</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Item Name"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="mg"
                                    placeholder="MG"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Short Description"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Image URL"
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <select
                                    name="company"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                >
                                    <option value="">Select Company</option>
                                    <option value="ABC Pharmaceuticals">ABC Pharmaceuticals</option>
                                </select>

                                <input
                                    type="number"
                                    name="originalPrice"
                                    placeholder="Price per unit"
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <input
                                    type="number"
                                    name="discount"
                                    placeholder="Discount (%)"
                                    defaultValue={0}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <div className="flex justify-end space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 bg-gray-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Add Medicine
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div></>

    );
};

export default ManageMedicines;
