import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper core styles
import 'swiper/css/navigation'; // Navigation module styles
import 'swiper/css/pagination'; // Pagination module styles
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import modules

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/medichin-benner') 
      .then((response) => response.json())
      .then((data) => setBanners(data))
      .catch((error) => console.error('Error fetching banner data:', error));
  }, []);

  return (
    <section className="relative mb-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-[400px] rounded-lg"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="relative bg-cover bg-center h-full w-full rounded-lg"
              style={{ backgroundImage: `url(${banner.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-6">
                <h2 className="text-4xl font-bold mb-4">{banner.title}</h2>
                <p className="text-lg mb-6">{banner.subtitle}</p>
                <a
                  href={banner.link}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
