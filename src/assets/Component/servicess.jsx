import React from 'react';

const machineServices = [
  {
    id: 1,
    title: "Machine Repair",
    description: "We provide professional repair services for industrial machinery to ensure high performance and minimal downtime.",
  },
  {
    id: 2,
    title: "Preventive Maintenance",
    description: "Our team offers preventive maintenance solutions to extend the life of your machines and prevent unexpected failures.",
  },
  {
    id: 3,
    title: "Machine Installation",
    description: "We assist in the installation and setup of new machinery, ensuring optimal performance right from the start.",
  },
];

const MachineServices = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Machine Services</h2>
        <p className="text-lg text-gray-600 mb-12">Reliable and efficient machine solutions tailored to your needs.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {machineServices.map((service) => (
            <div
              key={service.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MachineServices;
