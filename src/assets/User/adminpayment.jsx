import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AdminPayments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all payments from the backend
        axios
            .get("https://assignment-12-server-sable-six.vercel.app/paymentsemail") // Replace with your API endpoint
            .then((response) => {
                setPayments(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
                setLoading(false);
            });
    }, []);

    const handleAcceptPayment = (paymentId) => {
        // Update payment status to "Paid"
        axios
            .put(`https://assignment-12-server-sable-six.vercel.app/payments/${paymentId}`, { status: "Paid" }) // Replace with your API endpoint
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Payment Accepted",
                        text: "The payment status has been updated to Paid.",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    // Update payment status locally
                    setPayments((prevPayments) =>
                        prevPayments.map((payment) =>
                            payment._id === paymentId ? { ...payment, status: "Paid" } : payment
                        )
                    );
                }
            })
            .catch((error) => {
                console.error("Error updating payment status:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Could not update the payment status. Please try again.",
                });
            });
    };

    if (loading) {
        return <div className="text-center py-6">Loading payment data...</div>;
    }

    return (
        <>
            <Helmet>
                <title>
                    Medico | Payment Management
                </title>
            </Helmet>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Payment Management</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Transaction ID</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Amount (৳)</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.transactionId}</td>
                                <td className="border border-gray-300 px-4 py-2">{payment.price}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {new Date(payment.date).toLocaleDateString()}
                                </td>
                                <td
                                    className={`border border-gray-300 px-4 py-2 text-center ${payment.status === "Paid"
                                        ? "text-green-600"
                                        : "text-yellow-600"
                                        }`}
                                >
                                    {payment.status}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    {payment.status === "Pending" && (
                                        <button
                                            onClick={() => handleAcceptPayment(payment._id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                        >
                                            Accept Payment
                                        </button>
                                    )}
                                    {payment.status === "Paid" && (
                                        <span className="text-green-500 font-semibold">Completed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div></>
    );
};

export default AdminPayments;
