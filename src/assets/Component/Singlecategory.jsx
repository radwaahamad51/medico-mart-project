import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import CategoriesItem from "./CategorisItem";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const SingleItem = () => {
    const product = useLoaderData();
    const { medicines } = product;
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const { user, addToCart } = useContext(AuthContext);
    const navigate = useNavigate();


    // Function to handle modal close
    const closeModal = () => setSelectedMedicine(null);

    const handleAddToCart = (medicine) => {
        if (user) {
            addToCart(medicine);
            console.log(medicine) // Call the context function to add the item to the cart
        } else {
            // Redirect to login page if the user is not logged in
            navigate("/login");
        }
    };



    return (
        <>
            <Helmet>
                <title>
                    Medico | {product.name}
                </title>
            </Helmet>
            <div className="flex">
                {/* Sidebar */}
                <div>
                    <CategoriesItem />
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-6">
                    {/* Medicines Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {medicines.map((medicine, index) => (
                            <div
                                key={index}
                                className="relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Discount Badge */}
                                {medicine.discount && (
                                    <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tr-lg rounded-bl-lg z-10">
                                        {medicine.discount}% Off
                                    </div>
                                )}

                                {/* Medicine Image */}
                                <img
                                    src={medicine.image || "https://via.placeholder.com/150"}
                                    alt={medicine.name}
                                    className="w-full h-40 object-cover"
                                />

                                {/* Medicine Details */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-1 text-black">
                                        {medicine.name}{" "}
                                        <span className="text-sm text-gray-500">
                                            {medicine.mg} mg
                                        </span>
                                    </h3>
                                    {/* <p className="text-green-500 text-sm mb-1">
                                    {medicine.description || "No description available"}
                                </p> */}
                                    <p className="text-gray-500 text-sm mb-2">
                                        {medicine.company || "Unknown Manufacturer"}
                                    </p>

                                    {/* Price Section */}
                                    <div className="flex items-center mb-3">
                                        <span className="text-xl font-bold text-blue-600">
                                            ৳ {medicine.price || "0.00"}
                                        </span>
                                        {medicine.originalPrice && (
                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                ৳ {medicine.originalPrice}
                                            </span>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex gap-2">


                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md w-full" onClick={() => handleAddToCart(medicine)}>
                                            <Link to={'/singleitem'}>  Add to cart </Link>
                                        </button>


                                        <button
                                            onClick={() => setSelectedMedicine(medicine)}
                                            className="bg-gray-500 text-white py-2 px-4 rounded-md"
                                        >
                                            👁
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal */}
                {selectedMedicine && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            >
                                ✖
                            </button>

                            {/* Modal Content */}
                            <img
                                src={selectedMedicine.image || "https://via.placeholder.com/150"}
                                alt={selectedMedicine.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h2 className="text-xl font-bold mb-2">{selectedMedicine.name}</h2>
                            <p className="text-gray-700 mb-2">
                                <strong>Company:</strong> {selectedMedicine.company || "N/A"}
                            </p>
                            <p className="text-gray-700">
                                <strong>Description:</strong> {selectedMedicine.description || "N/A"}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SingleItem;
