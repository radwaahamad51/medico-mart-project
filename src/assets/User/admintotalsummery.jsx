import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Provider/AuthProvider";

const AdminDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logOut } = useContext(AuthContext);
  console.log(user)

  useEffect(() => {
    // Fetch all payments from the backend
    axios
      .get("https://assignment-12-server-sable-six.vercel.app/paymentsemail") // Replace with your API endpoint
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setLoading(false);
      });
  }, []);

  // Perform calculations based on payments data
  const totalSalesRevenue = payments.reduce((sum, payment) => sum + payment.price, 0);
  const totalSalesRevenueInThousands = (totalSalesRevenue / 1000).toFixed(2); // Convert to thousands
  const paidTotal = payments
    .filter(payment => payment.status === "Paid")
    .reduce((sum, payment) => sum + payment.price, 0);
  const pendingTotal = payments
    .filter(payment => payment.status === "Pending")
    .reduce((sum, payment) => sum + payment.price, 0);

  if (loading) {
    return <div className="text-center py-6">Loading payment data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center space-x-4 mb-6">
        <img src={user.photoURL} alt="User Avatar" className="w-20 h-20 rounded-full object-cover" />
        <div>
          <p className="text-xl font-semibold text-gray-800">{user.displayName}</p>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Sales Revenue */}
        <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Total Sales Revenue</h2>
          <p className="text-3xl font-bold">৳ {totalSalesRevenueInThousands}k</p>
        </div>
        {/* Paid Total */}
        <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Paid Total</h2>
          <p className="text-3xl font-bold">৳ {paidTotal}</p>
        </div>
        {/* Pending Total */}
        <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Pending Total</h2>
          <p className="text-3xl font-bold">৳ {pendingTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
