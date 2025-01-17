import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core styles
import 'swiper/css/navigation'; // Navigation module styles
import 'swiper/css/pagination'; // Pagination module styles
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'; // Import modules

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch discounted products data from API
    fetch('http://localhost:5000/medichin-category') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-10">Discount Products</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={20} // Space between each card
          slidesPerView={3} // Number of cards visible in one view
          scrollbar={{ draggable: true }} // Enable draggable scrollbar
          breakpoints={{
            // Responsiveness
            640: { slidesPerView: 1 }, // Mobile
            768: { slidesPerView: 2 }, // Tablet
            1024: { slidesPerView: 3 }, // Desktop
          }}
          className="h-auto"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white border rounded-lg shadow-md p-4 hover:shadow-lg transition">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-500 mb-2">
                  <span className="line-through text-red-500">${product.originalPrice}</span>{' '}
                  <span className="text-green-600 font-bold">${product.discountedPrice}</span>
                </p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                  Buy Now
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DiscountProducts;
