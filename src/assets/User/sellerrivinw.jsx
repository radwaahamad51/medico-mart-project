import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminSalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch sales data from the backend
        axios
            .get("http://localhost:5000/sales") // Replace with your API endpoint
            .then((response) => {
                setSalesData(response.data);
                setFilteredData(response.data); // Initialize filtered data
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
                setLoading(false);
            });
    }, []);

    // Filter data by date range
    const handleFilter = () => {
        const filtered = salesData.filter((sale) => {
            const saleDate = new Date(sale.date);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return saleDate >= start && saleDate <= end;
        });
        setFilteredData(filtered);
    };

    // Export to PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Sales Report", 20, 10);
        doc.autoTable({
            head: [["Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Date"]],
            body: filteredData.map((sale) => [
                sale.medicineName,
                sale.sellerEmail,
                sale.buyerEmail,
                sale.totalPrice,
                new Date(sale.date).toLocaleDateString(),
            ]),
        });
        doc.save("sales-report.pdf");
    };

    // Table Columns
    const columns = [
        {
            name: "Medicine Name",
            selector: (row) => row.medicineName,
            sortable: true,
        },
        {
            name: "Seller Email",
            selector: (row) => row.sellerEmail,
        },
        {
            name: "Buyer Email",
            selector: (row) => row.buyerEmail,
        },
        {
            name: "Total Price (৳)",
            selector: (row) => row.totalPrice,
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) => new Date(row.date).toLocaleDateString(),
            sortable: true,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Sales Report</h1>
            <div className="flex items-center gap-4 mb-6">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border px-3 py-2 rounded-md"
                />
                <button
                    onClick={handleFilter}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Filter
                </button>
            </div>
            {loading ? (
                <div className="text-center">Loading sales data...</div>
            ) : (
                <>
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                    />
                    <div className="mt-6 flex gap-4">
                        <CSVLink
                            data={filteredData}
                            headers={[
                                { label: "Medicine Name", key: "medicineName" },
                                { label: "Seller Email", key: "sellerEmail" },
                                { label: "Buyer Email", key: "buyerEmail" },
                                { label: "Total Price", key: "totalPrice" },
                                { label: "Date", key: "date" },
                            ]}
                            filename="sales-report.csv"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Export to CSV
                        </CSVLink>
                        <button
                            onClick={exportPDF}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Export to PDF
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminSalesReport;
