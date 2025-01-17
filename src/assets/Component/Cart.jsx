import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";



import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";

const CartPage = () => {
    const { user, cart } = useContext(AuthContext); // Assuming AuthContext provides user info
    const [carts, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
   
    // Fetch cart data from the database
    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:5000/medichin-oder?email=${user.email}`)
                .then((response) => {
                    setCart(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching cart data:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    // Update cart quantity
    // const updateQuantity = (_id, newQuantity) => {
    //     // Check if newQuantity is a valid number
    //     if (isNaN(newQuantity) || newQuantity <= 0) {
    //         console.error("Invalid quantity value");
    //         return;
    //     }

    //     // Ensure that you're sending all the necessary data in the request body
    //     const updatedItem = { Quantity: newQuantity };
    //     console.log(updatedItem)

    //     axios
    //         .put(`http://localhost:5000/medichin-oder/${_id}`, updatedItem)
    //         .then(() => {
    //             setCart((prevCart) =>
    //                 prevCart.map((item) =>
    //                     item.id === _id ? { ...item, Quantity: newQuantity } : item
    //                 )
    //             );
    //         })
    //         .catch((error) => {
    //             console.error("Error updating quantity:", error);
    //         });
    //     // fetch(`http://localhost:5000/medichin-oder/${_idid}`, {
    //     //     method: 'PUT',
    //     //     headers: {
    //     //         'content-type': 'application/json'
    //     //     },
    //     //     body: JSON.stringify(updatedItem)
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(data => {
    //     //         // console.log(data)
    //     //         Swal.fire({
    //     //             position: "top-end",
    //     //             icon: "success",
    //     //             title: "Upadate successfully",
    //     //             showConfirmButton: false,
    //     //             timer: 1500
    //     //         });

    //     //     })
    // };
    const updateQuantity = (_id, newQuantity,unitPrice) => {
        // Validate the new quantity
        if (isNaN(newQuantity) || newQuantity <= 0) {
            Swal.fire("Error", "Quantity must be a valid number greater than zero.", "error");
            return;
        }

        // Prepare the payload for the PUT request
        const updatedItem = { Quantity: newQuantity };
        const updatedPrice = unitPrice * newQuantity;
        axios
            .put(`http://localhost:5000/medichin-oder/${_id}`, updatedItem)
            .then(() => {
                // Update the state with the new quantity
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item._id === _id ? { ...item, Quantity: newQuantity , Price: updatedPrice} : item
                    )
                );
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Quantity updated successfully",
                    showConfirmButton: false,
                    timer: 1500,
                });
            })
            .catch((error) => {
                console.error("Error updating quantity:", error);
                Swal.fire("Error", "Failed to update quantity. Please try again.", "error");
            });
    };





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
                fetch(`http://localhost:5000/medichin-oder/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire("Deleted!", "Your item has been deleted.", "success");
                            setCart((prevOrders) => prevOrders.filter((order) => order._id !== id));
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

    // Clear the entire cart
    const clearCart = () => {
        axios
            .delete(`http://localhost:5000/api/cart?email=${user.email}`)
            .then(() => {
                setCart([]);
                Swal.fire("Cleared", "Your cart has been cleared", "success");
            })
            .catch((error) => {
                console.error("Error clearing cart:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Failed to clear the cart. Please try again later.",
                });
            });
    };


    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">My Cart</h1>

            {carts.length === 0 ? (
                <p className="text-gray-600">Your cart is empty.</p>
            ) : (
                <div>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Company</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">
                                    Price (৳)
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-center">
                                    Quantity
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Total</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {medicine.medichinname}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {medicine.company || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {medicine.Price}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(medicine._id, medicine.Quantity - 1)}
                                                className="bg-gray-200 px-2 py-1 rounded-md"
                                                disabled={medicine.Quantity <= 1} // Prevent reducing below 1
                                            >
                                                -
                                            </button>
                                            <span>{medicine.Quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(medicine._id, medicine.Quantity + 1)}
                                                className="bg-gray-200 px-2 py-1 rounded-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        ৳ {medicine.Price * medicine.Quantity}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(medicine._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tbody>
                            {cart.map((medicine) => (
                                <tr key={medicine.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {medicine.medichinname}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {medicine.company || "N/A"}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {medicine.Price}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <div className="flex justify-center items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(medicine._id, medicine.Quantity - 1 )}
                                                className="bg-gray-200 px-2 py-1 rounded-md"
                                                disabled={medicine.Quantity <= 1} // Prevent reducing below 1
                                            >
                                                -
                                            </button>
                                            <span>{medicine.Quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(medicine._id, medicine.Quantity + 1 )}
                                                className="bg-gray-200 px-2 py-1 rounded-md"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        ৳ {medicine.Price * medicine.Quantity}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDelete(medicine._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center mt-6">
                        <button
                            onClick={clearCart}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                        >
                            Clear Cart
                        </button>

                        <Link
                            to="/checkout"
                            className="bg-blue-500 text-white px-6 py-2 rounded-md"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
