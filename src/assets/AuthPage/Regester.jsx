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
    const [showPassword, setShowPassword] = useState(false)
    const axiosPublic = useAxiosPublic();
    const handleSubmit = (e) => {
        e.preventDefault();
        //get form data
        const form = new FormData(e.target);
        const name = form.get("name");
        if (name.length < 5) {
            setError({ ...error, name: "name should be more then 5 character" });
            return
        }
        const email = form.get("email");
        const photo = form.get("photo");
        const password = form.get("password");
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
            setErrors({ ...errors, name: "name should be more then 5 character" });
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",

            });
        }
        console.log(email)

        createNewUser(email, password)

            .then(result => {
                const user = result.user;
                // setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        // create user entry in the database
                        const userInfo = {
                            name: name,
                            email: email
                        }
                        console.log(userInfo)
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')

                                    Swal.fire({
                                        title: "successfully register.",
                                        width: 600,
                                        padding: "3em",
                                        color: "#716add",
                                        background: "#fff url(/images/trees.png)",
                                        backdrop: `
                                                      rgba(0,0,123,0.4)
                                                          url("/images/nyan-cat.gif")
                                                          left top
                                                          no-repeat
                                                        `
                                    });
                                    navigate('/');
                                }
                            })


                    })
                    .catch(error => console.log(error))
            })



            // .then((result) => {
            //     const user = result.user;
            //     // setUser(user);
            //     updateUserProfile({ displayName: name, photoURL: photo })
            //         .then((result) => {
            //             Swal.fire({
            //                 title: "successfully register.",
            //                 width: 600,
            //                 padding: "3em",
            //                 color: "#716add",
            //                 background: "#fff url(/images/trees.png)",
            //                 backdrop: `
            //                   rgba(0,0,123,0.4)
            //                   url("/images/nyan-cat.gif")
            //                   left top
            //                   no-repeat
            //                 `
            //             });

            //             navigate("/");
            //             // console.log(result)
            //         })
            //         .catch((err) => {
            //             // console.log(err);


            //         });
            // })
            .catch((err) => {
                console.log(err);

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",

                });

            });
    };



    // const handleSubmit = data => {

    //     createNewUser(data.email, data.password)
    //         .then(result => {
    //             const loggedUser = result.user;
    //             console.log(loggedUser);
    //             updateUserProfile(data.name, data.photoURL)
    //                 .then(() => {
    //                     // create user entry in the database
    //                     const userInfo = {
    //                         name: data.name,
    //                         email: data.email
    //                     }
    //                     axiosPublic.post('/users', userInfo)
    //                         .then(res => {
    //                             if (res.data.insertedId) {
    //                                 console.log('user added to the database')

    //                                 Swal.fire({
    //                                     position: 'top-end',
    //                                     icon: 'success',
    //                                     title: 'User created successfully.',
    //                                     showConfirmButton: false,
    //                                     timer: 1500
    //                                 });
    //                                 navigate('/');
    //                             }
    //                         })


    //                 })
    //                 .catch(error => console.log(error))
    //         })
    // };



    return (



        <>
            <Helmet>
                <title>
                    medico | Signup
                </title>
            </Helmet>
            <div className=" mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 mt-10 mb-4 ">
                <div>
                    <img className="w-85" src="https://i.ibb.co.com/M6yDrDR/Sign-up-bro.png" alt="" />
                </div>
                <div className="card bg-base-100 w-full max-w-lg shrink-0  p-10 mt-4 mb-4 rounded-md">
                    <h2 className="text-2xl font-semibold text-center text-yellow-300">
                        Register your account
                    </h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="name"
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
                                placeholder="photo-url"
                                className="input input-bordered text-white"
                                required
                            />
                        </div>
                        {/* email input  */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                className="input input-bordered text-white"
                                required
                            />
                        </div>

                        <div className=" form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="password"
                                className="input input-bordered text-white"
                                required
                            />
                            <div>
                                <button
                                    onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute right-2 bottom-11">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </button>
                            </div>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                            {errors.password && (
                                <label className="label text-sx text-red-500">{error.name}</label>
                            )}
                        </div>
                        {error.register && <label className="label">{error.register}</label>}

                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-neutral rounded-none " value="Add Item" />

                        </div>
                    </form>
                    <p className="text-center font-semibold text-yellow-300">
                        Allready Have An Account ?{" "}
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