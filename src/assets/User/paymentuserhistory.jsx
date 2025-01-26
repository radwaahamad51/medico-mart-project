import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const PaymentHistorys = () => {
    const { user } = useContext(AuthContext); // Assuming AuthContext provides user info
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch payment history data
    useEffect(() => {
        if (user) {
            axios
                .get(`https://assignment-12-server-sable-six.vercel.app/paymentsemail?email=${user.email}`)
                .then((response) => {
                    setPayments(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching payment history:", error);
                    setLoading(false);
                });
        }
    }, [user]);

    // Handle payment status update
    const handleAcceptPayment = (paymentId) => {
        axios
            .patch(`https://assignment-12-server-sable-six.vercel.app/payments/status/${paymentId}`, { status: "Paid" })
            .then((response) => {
                if (response.data.modifiedCount > 0) {
                    // Update the local state
                    setPayments((prevPayments) =>
                        prevPayments.map((payment) =>
                            payment._id === paymentId ? { ...payment, status: "Paid" } : payment
                        )
                    );
                }
            })
            .catch((error) => {
                console.error("Error updating payment status:", error);
            });
    };

    if (loading) {
        return <div className="text-center py-6">Loading payment history...</div>;
    }



    return (
        <> <Helmet>
            <title>
                Medico | Payment History
            </title>
        </Helmet>
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6">Payment History</h1>
                {payments.length === 0 ? (
                    <p className="text-gray-600">No payment history found.</p>
                ) : (
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
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                                onClick={() => handleAcceptPayment(payment._id)}
                                            >
                                                Accept Payment
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div></>
    );
};

export default PaymentHistorys;
