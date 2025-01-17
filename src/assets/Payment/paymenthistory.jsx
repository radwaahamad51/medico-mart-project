
import { useReactToPrint } from "react-to-print";
import useAuth from "../Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null); // Ensure `invoiceRef` is initialized correctly

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/paymentsemail?email=${user.email}`)
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

  const handlePrint = useReactToPrint({
    content: () => contentRef.current, // Return the correct reference here
    documentTitle: "Invoice",
    onBeforeGetContent: () => {
      console.log("Preparing invoice for printing...");
    },
  });

  if (loading) {
    return <div className="text-center py-6">Loading payment history...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-h-screen">
      <h1 className="text-2xl font-bold mb-6">Payment History</h1>
      {payments.length === 0 ? (
        <p className="text-gray-600">No payment history found.</p>
      ) : (
        <>
          {/* Invoice Section */}
          <div ref={invoiceRef} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <img
                src="/path-to-your-logo.png"
                alt="Website Logo"
                className="mx-auto h-16"
              />
              <h2 className="text-xl font-semibold mt-2">Your Medicine Shop</h2>
              <p className="text-gray-500">www.medicineshop.com</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold">Customer Information</h3>
              <p>Name: {user?.name || "N/A"}</p>
              <p>Email: {user?.email || "N/A"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold">Purchase Information</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Transaction ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Amount (৳)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment._id}>
                      <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.transactionId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 text-center ${
                          payment.status === "Paid" ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {payment.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-gray-500">
              Thank you for shopping with us!
            </p>
          </div>

          {/* Print Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Print Invoice
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
