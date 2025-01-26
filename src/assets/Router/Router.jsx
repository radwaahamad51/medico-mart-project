import { createBrowserRouter } from "react-router-dom";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Regester";
import Home from "../MainDesign/Home";
import AllHome from "../MainDesign/HomeSlide";
import SingleItem from "../Component/Singlecategory";
import CategoriesItem from "../Component/CategorisItem";
import CartPage from "../Component/Cart";
import ProductDetails from "../Component/SelectItem";
import Deshbord from "../User/Deshbord";
import ManageCategory from "../User/Managecategori";
import ManageBanner from "../User/Homepageupdate";
import Shop from "../Component/Shop";
import AllUsers from "../User/AllUser";
import ManageMedicines from "../User/usermadichinmanage";

import Payment from "../Payment/payment";
import PaymentHistory from "../Payment/paymenthistory";
import PaymentHistorys from "../User/paymentuserhistory";
import AboutUs from "../MainDesign/Footerreleted/Aboutus";
import LearnMoreSection from "../Component/Learnmoremoresection";
import AdminDashboard from "../User/admintotalsummery";
import AdminManageMedicines from "../User/adminmanagemadichin";
import AdminPayments from "../User/adminpayment";
import PrivateRoute from "./protectedroute";
import Profile from "../AuthPage/updateprofile";
import SalesReport from "../User/salesreport";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
        children: [
            {
                path: "/",
                element: <AllHome></AllHome>

            },
            {
                path: "/login",
                element: <Login></Login>

            },
            {
                path: "/regester",
                element: <Register></Register>
            },
            {
                path: '/medichin-category/:id',
                element: <SingleItem></SingleItem>,
                loader: ({ params }) => fetch(`https://assignment-12-server-sable-six.vercel.app/medichin-category/${params.id}`)
            },
            // {
            //     path: '/medichin-category',
            //     element: <CategoriesItem></CategoriesItem>,
            //     loader: () => fetch(`http://localhost:5000/medichin-category`)
            // },
            {
                path: "/cart",
                element: <PrivateRoute><CartPage></CartPage></PrivateRoute>
            },
            {
                path: "/singleitem",
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
            },
            {
                path: "/shop",
                element: <Shop></Shop>
            },
            {
                path: "/checkout",
                element: <Payment></Payment>
            },
            {
                path: "/paymenthistory",
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: "/about",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/updateprofile",
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: "/products",
                element: <LearnMoreSection></LearnMoreSection>
            },
            
        ]
    },
    {
        path: '/dashboard',
        element:<PrivateRoute><Deshbord></Deshbord></PrivateRoute>,
        children: [
            {
                path: "managecategory",
                element: <ManageCategory></ManageCategory>
            },
            {
                path: "managebenner",
                element: <ManageBanner></ManageBanner>
            },
            {
                path: "alluser",
                element: <AllUsers></AllUsers>
            },
            {
                path: "manage",
                element: <ManageMedicines></ManageMedicines>
            },
            {
                path: "paymenyhistoryuser",
                element: <PaymentHistorys></PaymentHistorys>
            },
            {
                path: "admindeshbord",
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: "admindemanagemt",
                element: <AdminManageMedicines></AdminManageMedicines>
            },
            {
                path: "adminpyment",
                element: <AdminPayments></AdminPayments>
            },
            {
                path: "selles",
                element: <SalesReport></SalesReport>
            }
        ]
    }


]);
export default router;