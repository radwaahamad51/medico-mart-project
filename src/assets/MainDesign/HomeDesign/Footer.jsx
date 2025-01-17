import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-200 py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">MedicoMart</h3>
                        <p className="text-sm">
                            Your trusted online pharmacy, delivering quality medicines and
                            healthcare products to your doorstep.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about" className="hover:text-green-400 transition">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/contact" className="hover:text-green-400 transition">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/shop" className="hover:text-green-400 transition">
                                    Shop Now
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="hover:text-green-400 transition">
                                    FAQs
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                        <p className="text-sm">
                            <strong>Email:</strong> support@medicomart.com
                        </p>
                        <p className="text-sm">
                            <strong>Phone:</strong> +1-234-567-890
                        </p>
                        <p className="text-sm">
                            <strong>Address:</strong> 123 Health Street, Wellness City, USA
                        </p>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} MedicoMart. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
