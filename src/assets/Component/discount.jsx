import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Core styles
import 'swiper/css/navigation'; // Navigation module styles
import 'swiper/css/pagination'; // Pagination module styles
import { Navigation, Pagination, Scrollbar } from 'swiper/modules'; // Import modules
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const DiscountProducts = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { cart, addToCart, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const maxQuantity = Math.min(20, products.quantity);
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handeladd = (e) => {
    e.preventDefault();

    const form = e.target;
    const medichinname = form.name.value;
    const Price = form.price.value;
    const company = form.company.value;

    const image = form.image.value;
    const Quantity = parseInt(form.Quantity.value, 10);


    const date = form.date.value;
    const UserName = user?.displayName || "Anonymous";
    const UserEmail = user?.email || "No Email";

    if (Quantity > maxQuantity) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You can only purchase up to ${maxQuantity} items.`,
      });
      return;
    }
    const allValue = {

      medichinname,
      Quantity,
      image,
      UserName,
      UserEmail,
      date,
      company,
      Price,
      cart



    };
    console.log(allValue)

    fetch("http://localhost:5000/medichin-oders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allValue),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your item has been saved",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state ? location.state : "/");
      });
  }





  useEffect(() => {
    // Fetch discounted products data from API
    fetch('http://localhost:5000/shop') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Filter products to include only those with discount > 0
        const discountedProducts = data.filter((product) => product.discount > 0);
        setProducts(discountedProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <section className="py-10  max-w-7xl mx-auto ">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-10">Discount Products</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No discounted products available at the moment.</p>
        ) : (
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
                {product.discount && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                {product.discount}% Off
                            </span>
                        )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}| {product.mg}</h3>
                  <p className="text-gray-500 mb-2">
                    <span className="line-through text-red-500">${product.originalPrice}</span>{' '}
                    <span className="text-green-600 font-bold">
                      ${product.originalPrice - product.discount}
                    </span>
                  </p>
                  <button onClick={() => openModal(product)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Buy Now
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}


      </div>


      {isModalOpen && selectedProduct && (

        <form onSubmit={handeladd} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 rounded-lg p-6 shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖️
            </button>
            <img
              name="image"
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-64 object-contain mb-4 "
            />
            <h2 className="text-2xl font-bold mb-4 text-black text-center">
              <input type="text"
                name="name"
                value={selectedProduct.name}
                disabled
                className=" hidden"
              />{selectedProduct.name}</h2>
            <table className="table-auto w-full border border-gray-300">
              <tbody>
                <tr>
                  <td className="px-4 py-2 font-bold border border-gray-300 text-black">Company</td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.company} <input type="text"
                    name="company"
                    value={selectedProduct.company}
                    disabled
                    className="text-sm text-gray-500 mb-4 hidden"
                  /></td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold border border-gray-300 text-black">Type</td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.type}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold border border-gray-300 text-black">Quantity</td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-800">
                    <input
                      type="number"
                      name="Quantity"
                      value={1} // Bind to state

                      className="text-sm text-gray-500 mb-4 bg-white border border-gray-300 rounded px-2 py-1"
                    />
                    <p className="text-xs text-red-500">
                      Maximum available quantity: {selectedProduct.quantity}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold border border-gray-300 text-black">Description</td>
                  <td className="px-4 py-2 border border-gray-300 text-gray-800">{selectedProduct.description}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold border border-gray-300 text-black">Price</td>
                  <td className="px-4 py-2 border border-gray-300 text-green-600 font-bold ">
                    ৳ {selectedProduct.price}
                    <input type="text"
                      name="price"
                      value={selectedProduct.price}
                      disabled
                      className="text-sm text-gray-500 mb-4 hidden"
                    />
                  </td>
                </tr>

              </tbody>
            </table>

            <div className="hidden">
              <label className="block text-gray-600">Buying Date</label>
              <input
                type="text"
                value={new Date().toLocaleString()}
                disabled
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                name="date"
              />
            </div>
            <button
              type="submit"
              onClick={() => addToCart(selectedProduct, quantity)}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Add TO Cart
            </button>
          </div>
        </form>
      )}





    </section>
  );
};

export default DiscountProducts;
