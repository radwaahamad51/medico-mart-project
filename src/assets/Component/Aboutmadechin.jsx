import React from "react";
import { motion } from "framer-motion";

const AboutMedicineShop = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-5 text-center">
                {/* Logo */}
                <motion.div
                    className="mb-6 flex justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-20 h-20 bg-blue-500 flex items-center justify-center rounded-full">
                        <h1 className="text-3xl text-white font-bold">M|M</h1>
                    </div>
                </motion.div>

                {/* Heading */}
                <motion.h2
                    className="text-4xl font-bold text-gray-800 dark:text-white mb-6"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About Our Medicine Shop
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    We are committed to delivering the best healthcare products to your
                    doorstep. Our mission is to ensure quality, affordability, and
                    accessibility for everyone. Trust us to provide genuine products,
                    exceptional customer service, and reliable delivery that prioritizes
                    your health and well-being.
                </motion.p>

                {/* Feature List */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.3 },
                        },
                    }}
                >
                    {/* Feature 1 */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            Genuine Products
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            All medicines are sourced from trusted suppliers to guarantee
                            authenticity.
                        </p>
                    </motion.div>

                    {/* Feature 2 */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            Affordable Prices
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Get the best deals on essential medicines and healthcare products.
                        </p>
                    </motion.div>

                    {/* Feature 3 */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold text-blue-500 mb-2">
                            Fast Delivery
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Quick and reliable delivery to your doorstep, wherever you are.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutMedicineShop;
