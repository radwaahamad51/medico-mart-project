import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const CategoriesItem = () => {
    // const Madechin = useLoaderData();
    const [Madechin, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://assignment-12-server-sable-six.vercel.app/medichin-category')
            .then((response) => response.json())
            .then((data) => setCategories(data))

            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    // console.log(Madechin)
    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md w-64 mt-6 mx-auto ml-4 ">
                <h2 className="text-lg font-bold mb-4 text-black">Product Categories</h2>
                <ul>
                    {Madechin.map((category, index) => (
                        <Link to={`/medichin-category/${category._id}`}>
                            <li
                                key={index}
                                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-8 h-8 object-cover rounded-full mr-3"
                                    />
                                    <span className="text-sm font-medium text-black">{category.name}</span>
                                </div>
                                <span className="text-gray-400">&gt;</span>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
          

        </div>
    )
};
export default CategoriesItem