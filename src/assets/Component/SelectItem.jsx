import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const [quantity, setQuantity] = useState(1);
    const { cart, addToCart, user } = useContext(AuthContext);
    console.log(cart, user);
    const navigate = useNavigate();


    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const maxQuantity = Math.min(20, cart.quantity);


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

    return (
        <div className="p-6 bg-gray-50">
            {cart.map((product, index) => (
                <form onSubmit={handeladd} >
                    <div
                        key={index}
                        className="flex flex-col md:flex-row gap-8 mb-8 bg-white p-6 rounded-lg shadow-md"
                    >
                        {/* Product Image */}
                        <div className="flex-1">
                            <img
                                name="image"
                                src={product.image || "https://via.placeholder.com/300"}
                                alt={product.name}
                                className="rounded-lg w-full max-w-sm mx-auto"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                            <input type="text"
                                name="name"
                                value={product.name}
                                disabled
                                className="text-2xl font-bold text-gray-800"
                            />
                            <p className="text-sm text-gray-600"> Quentity : {product.quantity || "N/A"}</p>
                            <input type="text"
                                name="company"
                                value={product.company}
                                disabled
                                className="text-sm text-gray-500 mb-4"
                            />


                            {/* Pricing Section */}
                            <div className="mb-4">
                                {product.originalPrice && (
                                    <p className="text-gray-500 text-sm line-through">
                                        MRP ৳ {product.originalPrice}
                                    </p>
                                )}
                                {product.discount && (
                                    <p className="text-green-600 text-sm">{product.discount}% Off</p>
                                )}
                                <h1 name="price" className="text-2xl font-bold text-blue-600" value={cart.price}>
                                    Best Price ৳ {product.price}{" "}
                                    <input type="text"
                                        name="price"
                                        value={product.price}
                                        disabled
                                        className="text-sm text-gray-500 mb-4 hidden"
                                    />
                                    <span className="text-sm font-normal text-gray-500">
                                        /Pack
                                    </span>
                                </h1>





                            </div>

                            {/* Pack Selector */}
                            {/* <div className="mb-4">
                            <select
                                className="w-full border rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                defaultValue={product.packSize || "Select Pack"}
                            >
                                {product.availablePacks?.map((pack, idx) => (
                                    <option key={idx} value={pack}>
                                        {pack}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                            {/* Quantity Selector */}
                            <div className="flex items-center mb-6">
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded-l-md text-gray-600"
                                    onClick={handleDecrease}
                                >
                                    -
                                </button>
                                <input
                                    max={maxQuantity}
                                    min={1}
                                    placeholder={`Max: ${maxQuantity}`}
                                    name="Quantity"
                                    type="text"
                                    className="w-12 text-center border-t border-b text-white"
                                    value={quantity}
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="bg-gray-200 px-4 py-2 rounded-r-md text-gray-600"
                                    onClick={handleIncrease}
                                >
                                    +
                                </button>
                            </div>


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

                            {/* Add to Cart Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md text-lg"
                                onClick={() => addToCart(product, quantity)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default ProductDetails;
