import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

const SalesReport = () => {
    const [salesData, setSalesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        axios.get("https://assignment-12-server-sable-six.vercel.app/shop")
            .then((response) => {
                setSalesData(response.data);
                setFilteredData(response.data);
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
            });
    }, []);

    // Filter data by date range
    const filterByDate = () => {
        if (startDate && endDate) {
            const filtered = salesData.filter((sale) => {
                const saleDate = new Date(sale.date);
                return saleDate >= startDate && saleDate <= endDate;
            });
            setFilteredData(filtered);
        } else {
            setFilteredData(salesData); // Reset filter
        }
    };

    // Export as PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Medicine Name", "Seller Email", "Buyer Email", "Total Price", "Date"];
        const tableRows = filteredData.map((item) => [
            item.medicineName,
            item.sellerEmail,
            item.buyerEmail,
            item.totalPrice,
            new Date(item.date).toLocaleDateString(),
        ]);

        doc.text("Sales Report", 14, 15);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
        });
        doc.save("sales_report.pdf");
    };

    // Export as Excel
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
        XLSX.writeFile(workbook, "sales_report.xlsx");
    };

    // Table columns
    const columns = [
        { name: "Medicine Name", selector: (row) => row.name, sortable: true },
        { name: "Seller Email", selector: (row) => row.UserEmail, sortable: true },
        { name: "Buyer Email", selector: (row) => row.buyerEmail, sortable: true },
        {
            name: "Total Price", selector: (row) => row.price, sortable: true, right: true
        },
        { name: "Date", selector: (row) => new Date(row.date).toLocaleDateString(), sortable: true },
    ];

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Sales Report</h1>

            {/* Date Range Filter */}
            <div className="flex gap-4 mb-4">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Start Date"
                    className="border p-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText="End Date"
                    className="border p-2"
                />
                <button
                    onClick={filterByDate}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Filter
                </button>
            </div>

            {/* DataTable */}
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                defaultSortField="date"
            />

            {/* Export Buttons */}
            <div className="flex gap-4 mt-4">
                <CSVLink data={filteredData} filename="sales_report.csv" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Export CSV
                </CSVLink>
                <button onClick={exportPDF} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Export PDF
                </button>
                <button onClick={exportExcel} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Export Excel
                </button>
            </div>
        </div>
    );
};

export default SalesReport;
