import React from "react";
import { motion } from "framer-motion";

const LearnMoreSection = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 max-h-screen mb-15">
            <div className="container mx-auto px-5">
                {/* Heading */}
                <motion.h2
                    className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Learn More About Our Services
                </motion.h2>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* How to Buy */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                            How to Buy
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Browse through our extensive catalog, add your preferred items to
                            the cart, and proceed to checkout with ease.
                        </p>
                    </motion.div>

                    {/* Payment Methods */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                            Payment Options
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            We accept multiple payment methods including credit/debit cards,
                            online banking, UPI, and cash on delivery for your convenience.
                        </p>
                    </motion.div>

                    {/* Customer Support */}
                    <motion.div
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <h3 className="text-2xl font-semibold text-blue-500 mb-4">
                            Need Help?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            Contact our 24/7 customer support team for assistance with
                            purchases, refunds, or any queries you may have.
                        </p>
                    </motion.div>
                </div>

                {/* Call to Action */}
               
            </div>
        </section>
    );
};

export default LearnMoreSection;
