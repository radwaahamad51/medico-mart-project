import React from 'react';

const LocationSection = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 p-4 m">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-6 animate__animated animate__fadeIn">Our Location</h2>
        <div className="relative">
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-20 h-20 bg-white rounded-full shadow-xl animate-bounce"></div>
          </div>
          <div className="text-xl font-semibold text-white mt-4">123 React St, Tailwind City</div>
        </div>
      </div>
    </div>
  );
};

export default LocationSection;
