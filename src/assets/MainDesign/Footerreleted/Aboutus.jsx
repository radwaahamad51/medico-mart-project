import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="bg-gray-100 py-16 min-h-screen" id="about-us" >
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-10 text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <motion.div
            className="text-gray-700 space-y-5"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold">
              Your Trusted Online Medicine Store
            </h3>
            <p>
              At <strong>MedicoMart</strong>, we are dedicated to providing you
              with top-quality medicines and healthcare products at your
              convenience. With years of experience in the healthcare sector,
              we aim to simplify access to essential medications.
            </p>
            <p>
              Our mission is to deliver a hassle-free experience for our
              customers, ensuring reliability, affordability, and excellent
              service at every step.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="https://via.placeholder.com/500x300" // Replace with your image URL
              alt="About Us"
              className="rounded-lg shadow-md"
            />
          </motion.div>
        </div>
      </div>

      {/* Animated Stats Section */}
      <div className="mt-56 bg-green-500 py-10">
        <div className="container mx-auto px-4 text-center text-white">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.div
              className="text-4xl font-bold"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <span>50K+</span>
              <p className="text-lg font-medium mt-2">Happy Customers</p>
            </motion.div>
            <motion.div
              className="text-4xl font-bold"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <span>1M+</span>
              <p className="text-lg font-medium mt-2">Products Delivered</p>
            </motion.div>
            <motion.div
              className="text-4xl font-bold"
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <span>99%</span>
              <p className="text-lg font-medium mt-2">Customer Satisfaction</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
