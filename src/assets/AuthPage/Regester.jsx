import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Register = () => {
    const { createNewUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Get form data
        const form = new FormData(e.target);
        const name = form.get("name");
        if (name.length < 5) {
            setError({ ...error, name: "Name should be more than 5 characters" });
            return;
        }
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");
        const role = form.get("role");

        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setErrors({ ...errors, password: "Password must be at least 6 characters long, with both uppercase and lowercase letters." });
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password requirements not met!",
            });
        }

        createNewUser(email, password)
            .then((result) => {
                const user = result.user;
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        // Create user entry in the database
                        const userInfo = {
                            name: name,
                            email: email,
                            role: role, // Include role in user data
                        };
                        axiosPublic.post("/users", userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Successfully registered.",
                                        icon: "success",
                                    });
                                    navigate("/");
                                }
                            });
                    })
                    .catch((error) => console.log(error));
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Medico | Signup</title>
            </Helmet>
            <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-10 mb-4">
                <div>
                    <img className="w-85" src="https://i.ibb.co.com/M6yDrDR/Sign-up-bro.png" alt="" />
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0 p-10 mt-4 mb-4 rounded-md">
                    <h2 className="text-2xl font-semibold text-center text-yellow-300">
                        Register Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Name"
                                className="input input-bordered text-white"
                                required
                            />
                        </div>
                        {error.name && (
                            <label className="label text-sx text-red-500">{error.name}</label>
                        )}

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Photo URL"
                                className="input input-bordered text-white"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="input input-bordered text-white"
                                required
                            />
                        </div>

                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="input input-bordered text-white"
                                    required
                                /></>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="btn btn-xs absolute right-2   bottom-11"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && (
                                <label className="label text-sx text-red-500">{errors.password}</label>
                            )}
                        </div>

                        {/* Role selection */}
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text">Role</span>
                            </label>
                            <select name="role" className="select select-bordered text-white" required>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>

                        <div className="form-control mt-6">
                            <input
                                type="submit"
                                className="btn btn-neutral rounded-none"
                                value="Register"
                            />
                        </div>
                    </form>
                    <p className="text-center font-semibold text-yellow-300">
                        Already Have An Account?{" "}
                        <Link className="text-red-500" to="/login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;
