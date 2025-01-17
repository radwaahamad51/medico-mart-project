import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Deshbord = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex ">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold mb-4">Menu</h1>
              {
                isAdmin? 
                <>
                <ul className="space-y-2">
                    <Link to={'admindeshbord'}><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li></Link>
                    <Link  to={'alluser'} ><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Manage Users</li></Link>
                    <Link to={'admindemanagemt'}><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Manage Medicines</li></Link>
                    <Link to={'adminpyment'}><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Payment</li></Link>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Sales Report</li>
                  <Link to={'managebenner'}>  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Update home</li></Link>

                    <Link to={'/'}>  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li></Link>
                </ul></>
                 :<>
                <ul className="space-y-2">
                  
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Payment History</li>
                   

                    <Link to={'/'}>  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li></Link>
                </ul></>
              } 
                <hr />
                <ul className="space-y-2">
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Dashboard</li>
                    <Link to={'manage'}><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Manage Medicines</li></Link>
                    <Link to={'paymenyhistoryuser'}><li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Payment History</li></Link>
                    <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Ask For Advertisement</li>

                    <Link to={'/'}>  <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li></Link>
                </ul>

            </div>

            {/* Main Content */}
            <div className="w-full bg-gray-100 p-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default Deshbord;
