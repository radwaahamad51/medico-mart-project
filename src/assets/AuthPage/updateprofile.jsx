import { useContext, useState } from "react";


import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";



const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await updateProfile(user, { displayName: name, photoURL });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            
            <div className=" mx-auto pt-10 pb-10 bg-sky-200">
                <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                    <img
                        src={photoURL || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4"
                    />
                    <div className="mb-6">
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Photo URL</label>
                            <input
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md text-white"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Profile;
