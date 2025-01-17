import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const sliderRef = useRef();

    // Fetch data from the external JSON file
    useEffect(() => {
        fetch('http://localhost:5000/medichin-category')
            .then((response) => response.json())
            .then((data) => setCategories(data))
         
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);
    console.log(categories)

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-lg font-bold mb-4">Product Categories</h2>
            <div className="relative">
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10"
                    aria-label="Scroll Left"
                >
                     ▶
                </button>

                {/* Slider */}
                <div
                    ref={sliderRef}
                    className="flex space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
                >
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md w-48 flex-shrink-0"
                            >
                               <Link to={`/medichin-category/${category._id}`}>
                               <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-16 h-16 object-cover mb-2"
                                />
                                <h3 className="text-center font-medium text-black">{category.name
                                }</h3>
                               
                                <p className="text-sm text-gray-500">Available: {category.quantity}</p>
                               </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full">
                            <p className="text-gray-500">Loading categories...</p>
                        </div>
                    )}
                </div>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full z-10 "                >
                    ▶
                </button>
            </div>
            <div className="text-right mt-4">
                <Link to={"/medichin-category/6786c01ff58fc959f67e59b9"} className="text-blue-500 underline">
                    See All
               </Link>
            </div>
        </div>
    );
};

export default CategorySlider;
