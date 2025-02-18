import React from 'react';

const deliveryServices = [
  {
    id: 1,
    title: "Safe Transport",
    description: "We ensure that your machines are safely transported with the highest level of care to prevent any damage during transit.",
    icon: "🚚", // Use relevant icons for visual appeal
  },
  {
    id: 2,
    title: "Timely Delivery",
    description: "Our priority is to deliver your machines on time, every time, so you can start your operations without delay.",
    icon: "⏱️",
  },
  {
    id: 3,
    title: "Global Reach",
    description: "No matter where you are, our delivery service ensures your machinery reaches its destination efficiently, whether locally or internationally.",
    icon: "🌍",
  },
];

const MachineDeliveryServices = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-6 transform transition duration-500 hover:scale-105">Machine Delivery Services</h2>
        <p className="text-lg mb-12">We guarantee safe, fast, and reliable delivery of your machines, anywhere in the world.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deliveryServices.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl hover:scale-105 transform transition duration-300"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineDeliveryServices;
