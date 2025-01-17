import { Outlet } from "react-router-dom";
import Navber from "./Navber";
import Footer from "./HomeDesign/Footer";

const Home = () => {



    return (
        <div>


            <div className="bg-cover bg-center bg-no-repeat h-64">

                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
                    <div className="flex justify-center items-center mt-10">

                    </div>
                    <div className="text-center mt-10">
                        <Navber></Navber>

                        


                        
                        <Outlet></Outlet>

                        <Footer></Footer>
                        

                    </div>
                </div>


                <div></div>

            </div>
        </div>
    )

};

export default Home;