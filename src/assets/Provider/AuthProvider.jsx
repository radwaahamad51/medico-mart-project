import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Auth.init/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvoder = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    const [cart, setCart] = useState([]);


    // Cart management functions
    const addToCart = (item) => {
        setCart([item]); // Add a single item to the cart
    };

    const clearTemporaryCart = () => {
        setCart([]); // Clear the cart
    };




    // login sector
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    };

    // logout
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    //   register section

    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // google login
    const handelgogolesignin = () => {
        const googleProvider = new GoogleAuthProvider(); // Create an instance of GoogleAuthProvider
        setLoading(true);
        return signInWithPopup(auth, googleProvider) // Pass the instance here
            .then((result) => {
                setUser(result.user);

                fetch('http://localhost:5000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(result.user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                console.log("Google Sign-In Successful:", result.user);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error during Google Sign-In:", error);
                setLoading(false);
            });
    };

    // updateProfile
    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };



    // loding data not gone
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, [axiosPublic]);

    // Context value
    const authInfo = {
        user,
        loading,
        setUser,
        userLogin,
        createNewUser,
        logOut,
        handelgogolesignin,
        updateUserProfile,
        cart,
        addToCart,
        clearTemporaryCart


    };
    return <AuthContext.Provider value={authInfo} >{children}</AuthContext.Provider>
};
export default AuthProvoder;