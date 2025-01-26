import { useReactToPrint } from "react-to-print";
import useAuth from "../Hooks/useAuth";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

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

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
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
                src="https://i.ibb.co.com/mTHvyV8/images-4.png"
                alt="Website Logo"
                className="mx-auto h-16"
              />
              <h2 className="text-xl font-semibold mt-2 text-black">
                Your Medicine Shop
              </h2>
              <p className="">www.medicineshop.com</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-black">Customer Information</h3>
              <p className="text-black">Name: {user?.name || "N/A"}</p>
              <p className="text-black">Email: {user?.email || "N/A"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-black">Purchase Information</h3>
              <table
                id="payment-history-table"
                className="w-full border-collapse border border-gray-300"
              >
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
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {payment.transactionId}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
                        {payment.price}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-black">
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

          {/* Action Buttons */}
          <div className="mt-6 text-center">
            <button
              onClick={handlePrint}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition mr-4"
            >
              Print Invoice
            </button>
            <ReactHTMLTableToExcel
              id="export-excel-button"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              table="payment-history-table"
              filename="Payment_History"
              sheet="PaymentHistory"
              buttonText="Export to Excel"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentHistory;
