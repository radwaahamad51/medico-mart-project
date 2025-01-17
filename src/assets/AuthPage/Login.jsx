
import { AuthContext } from "../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";






const Login = () => {

    const { userLogin, setUser } = useContext(AuthContext)
    const [error, setError] = useState({});
    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
        userLogin(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                Swal.fire({
                    title: "congratulated successfully login",
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

                navigate(location?.state ? location.state : "/");
            })
            .catch((err) => {
                setError({ ...error, login: err.code });
                // console.log('error')
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });

            });
    };


    const { handelgogolesignin } = useContext(AuthContext);
    const handelGogolesignin = () => {
        handelgogolesignin()
            .then(() => {
                // console.log("User logged in with Google!");
                Swal.fire({
                    title: "congratulated successfully login",
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

                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                // console.error("Google Login Error:", error);
            });
    };

    return (



        <div className="min-h-screen mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2  ">
            <div className="w-90 mt-6"><img src="https://i.ibb.co.com/ssBQQR8/Mobile-login-bro-1.png" alt="" /></div>
            <div className="box mt-10">
                <div class="border-line"></div>
                <section>

                    <h2 className="text-2xl font-semibold text-center text-yellow-300">
                        Login your account
                    </h2>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="email"
                                className="input input-bordered "
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                            {error.login && (
                                <label className="label text-sm text-red-600">
                                    {error.login}
                                </label>
                            )}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral rounded-none">Login</button>
                        </div>

                    </form>
                    <p className="text-center font-semibold text-yellow-300">
                        Dont’t Have An Account ?{" "}
                        <Link className="text-red-500" to="/regester">
                            Register
                        </Link>
                    </p>
                    <div className="mt-6 text-center ">
                        <button onClick={handelGogolesignin} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(130,255,13,1)"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg></button>
                    </div>
                </section>


            </div>
        </div>


    )
};
export default Login;



