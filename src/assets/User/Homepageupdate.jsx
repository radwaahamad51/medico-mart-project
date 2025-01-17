import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageBanner = () => {
    const [medicines, setMedicines] = useState([]);

    // Fetch medicines
    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get("http://localhost:5000/medichin-benner");
            setMedicines(response.data);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    // Toggle banner status
    const handleToggleBanner = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/medicines/${id}/toggle-feature`);
            fetchMedicines(); // Refresh the list
        } catch (error) {
            console.error("Error toggling banner status:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Manage Banner Advertise</h1>
            <table className="w-full bg-white rounded shadow-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-4 text-left">#</th>
                        <th className="p-4 text-left">Image</th>
                        <th className="p-4 text-left">Name</th>
                        <th className="p-4 text-left">Description</th>
                        <th className="p-4 text-left">Seller Email</th>
                        <th className="p-4 text-center">Add to Slide</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine, index) => (
                        <tr key={medicine._id} className="border-b">
                            <td className="p-4">{index + 1}</td>
                            <td className="p-4">
                                <img
                                    src={medicine.image}
                                    alt={medicine.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </td>
                            <td className="p-4">{medicine.title}</td>
                            <td className="p-4">{medicine.subtitle}</td>
                            <td className="p-4">{medicine.sellerEmail}</td>
                            <td className="p-4 text-center">
                                <button
                                    className={`px-4 py-2 rounded ${medicine.isFeatured ? "bg-red-500 text-white" : "bg-green-500 text-white"
                                        }`}
                                    onClick={() => handleToggleBanner(medicine._id)}
                                >
                                    {medicine.isFeatured ? "Remove from Slide" : "Add to Slide"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBanner;
