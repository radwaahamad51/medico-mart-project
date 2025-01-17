import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const itemsPerPage = 8; // Number of items to display per page
    const { cart, addToCart, user } = useContext(AuthContext);

    const navigate = useNavigate();
    const maxQuantity = Math.min(20, products.quantity);

    const openModals = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        setFormDetails({ quantity: 1, notes: "" }); // Reset form details
    };

    const closeModals = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // const handeladd = (product) => {
    //     if (user) {
    //         addToCart(product); // Add the product to the cart
    //         alert("Product added to cart!");
    //         console.log(product)
    //     } else {
    //         alert("Please log in to add items to your cart.");
    //         // Redirect logic if necessary
    //     }
    // };


    // ajaira
    const handeladd = (e) => {
        e.preventDefault();

        const form = e.target;
        const medichinname = form.name.value;
        const Price = form.price.value;
        const company = form.company.value;

        const image = form.image.value;
        const Quantity = parseInt(form.Quantity.value, 10);


        const date = form.date.value;
        const UserName = user?.displayName || "Anonymous";
        const UserEmail = user?.email || "No Email";

        if (Quantity > maxQuantity) {
            Swal.fire({
                icon: "error",
                title: "Invalid Quantity",
                text: `You can only purchase up to ${maxQuantity} items.`,
            });
            return;
        }
        const allValue = {

            medichinname,
            Quantity,
            image,
            UserName,
            UserEmail,
            date,
            company,
            Price,
            cart



        };
        console.log(allValue)

        fetch("http://localhost:5000/medichin-oders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(allValue),
        })
            .then((res) => res.json())
            .then((data) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your item has been saved",
                    showConfirmButton: false,
                    timer: 1500,
                });

                navigate(location?.state ? location.state : "/");
            });
    }



    useEffect(() => {
        // Fetch data from your database collection
        const fetchData = async () => {
            const response = await fetch("http://localhost:5000/shop"); // Replace with your API endpoint
            const data = await response.json();
            setProducts(data);
        };

        fetchData();
    }, []);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const handleNext = () => {
        if (currentPage < Math.ceil(products.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="p-6  max-w-7xl mx-auto max-h-screen">
            <h1 className="text-2xl font-bold mb-4">Category</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {currentItems.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white border rounded-lg shadow-md p-4 relative"
                    >
                        {product.discount && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                {product.discount}% Off
                            </span>
                        )}
                        <img

                            src={product.image}
                            alt={product.name}
                            className="w-full h-32 object-cover mb-2"
                        />
                        <h2 className="text-lg font-semibold text-black">{product.name}</h2>
                        <p className="text-sm text-gray-500">{product.type}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                        <p className="text-lg font-bold text-green-600">৳ {product.price}</p>
                        {product.originalPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                ৳ {product.originalPrice}
                            </p>
                        )}
                        <div className="flex justify-between items-center mt-2">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => openModal(product)}>
                                Add to cart
                            </button>
                            <button
                                onClick={() => openModal(product)}
                                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                            >
                                👁️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Prev
                </button>
                {[...Array(Math.ceil(products.length / itemsPerPage)).keys()].map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page + 1)}
                            className={`px-4 py-2 rounded ${currentPage === page + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 hover:bg-gray-400"
                                }`}
                        >
                            {page + 1}
                        </button>
                    )
                )}
                <button
                    onClick={handleNext}
                    disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg relative">
                        <button
                            onClick={closeModals}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖️
                        </button>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-64 object-contain mb-4 "
                        />
                        <h2 className="text-2xl font-bold mb-4 text-black text-center">{selectedProduct.name}</h2>
                        <table className="table-auto w-full border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Company</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.company}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Type</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.type}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Quantity</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.quantity}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Description</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.description}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Price</td>
                                    <td className="px-4 py-2 border border-gray-300 text-green-600 font-bold ">
                                        ৳ {selectedProduct.price}
                                    </td>
                                </tr>
                                {selectedProduct.originalPrice && (
                                    <tr>
                                        <td className="px-4 py-2 font-bold border border-gray-300 text-black">Original Price</td>
                                        <td className="px-4 py-2 border border-gray-300 line-through text-gray-400">
                                            ৳ {selectedProduct.originalPrice}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button
                            onClick={closeModal}
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            {/* Modal 2*/}
            {isModalOpen && selectedProduct && (

                <form onSubmit={handeladd} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg relative">
                        <button
                            onClick={closeModals}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            ✖️
                        </button>
                        <img
                            name="image"
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="w-full h-64 object-contain mb-4 "
                        />
                        <h2 className="text-2xl font-bold mb-4 text-black text-center">
                            <input type="text"
                                name="name"
                                value={selectedProduct.name}
                                disabled
                                className=" hidden"
                            />{selectedProduct.name}</h2>
                        <table className="table-auto w-full border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Company</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.company} <input type="text"
                                        name="company"
                                        value={selectedProduct.company}
                                        disabled
                                        className="text-sm text-gray-500 mb-4 hidden"
                                    /></td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Type</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.type}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Quantity</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">
                                        <input
                                            type="number"
                                            name="Quantity"
                                             value={1} // Bind to state
                                            
                                            className="text-sm text-gray-500 mb-4 bg-white border border-gray-300 rounded px-2 py-1"
                                        />
                                        <p className="text-xs text-red-500">
                                            Maximum available quantity: {selectedProduct.quantity}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Description</td>
                                    <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.description}</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 font-bold border border-gray-300 text-black">Price</td>
                                    <td className="px-4 py-2 border border-gray-300 text-green-600 font-bold ">
                                        ৳ {selectedProduct.price}
                                        <input type="text"
                                            name="price"
                                            value={selectedProduct.price}
                                            disabled
                                            className="text-sm text-gray-500 mb-4 hidden"
                                        />
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>

                        <div className="hidden">
                            <label className="block text-gray-600">Buying Date</label>
                            <input
                                type="text"
                                value={new Date().toLocaleString()}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                                name="date"
                            />
                        </div>
                        <button
                            type="submit"
                            onClick={() => addToCart(selectedProduct, quantity)}
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                        >
                            Add TO Cart
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Shop;
