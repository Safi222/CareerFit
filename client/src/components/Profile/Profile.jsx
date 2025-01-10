/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext, useState } from "react";
import Loader from "../Loader/Loader";
import DefaultAvatar from "../../Assets/default-avatar.jpg";
import { BiSolidCameraPlus } from "react-icons/bi";

const Profile = () => {
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const navigate = useNavigate();
  const { user, logout, setUser } = useContext(AuthContext);
  const [cvFile, SetCvFile] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPicLoading, setIsPicLoading] = useState(false);
  const [profileImageFile, setprofileImageFile] = useState(null);

  const handleFileChange = async (event) => {
    console.log(event.target.files[0]);
    SetCvFile(event.target.files[0]);
  };

  const submitCv = async () => {
    if (!cvFile) {
      setError("Please upload a CV file.");
      return;
    }

    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("cvFile", cvFile); // "cv" is the key expected by the API
      setIsLoading(true);

      const res = await fetch(`${serverUri}/users/cv`, {
        method: "POST", // Change to POST if required
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();
      user.cvFile = data.data.cvFile;
      setUser(user);
      setError("");
      SetCvFile(null);
      setIsLoading(false);
    } catch (err) {
      setError("Please upload a CV file.");
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <button
            className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition duration-200"
            onClick={() => navigate("/login")}
          >
            Go Back to Login
          </button>
        </div>
      </div>
    );
  }

  const handleProfileFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const token = localStorage.getItem("token");

    if (!selectedFile) {
      alert("No file selected.");
      return;
    }

    // Check if the selected file is an image
    const acceptedTypes = ["image/png", "image/jpeg", "image/webp"];
    if (!acceptedTypes.includes(selectedFile.type)) {
      alert("Please upload a valid image (PNG, JPEG, WEBP).");
      event.target.value = ""; // Clear the file input
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);
    setIsPicLoading(true);

    try {
      // Make the API call to upload the image
      const response = await fetch(`${serverUri}/users/profile-picture`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });

      setIsPicLoading(false);
      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      if (result.status == "success") {
        user.profilePic = result.data.profilePic;
        setUser(user);
        setprofileImageFile(result.data.profilePic);
      }
    } catch (error) {
      setIsPicLoading(false);
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome, {user.firstName}</h1>
        <button
          onClick={logout}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Sign out
        </button>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10">Profile</h2>
          <div className="flex justify-center items-center w-fit mx-auto mb-8 relative">
            {profileImageFile || user.profilePic ? (
              <img
                className="custom-profile-pic"
                src={profileImageFile || user.profilePic}
                alt="profile picture"
              />
            ) : (
              <img
                className="custom-profile-pic"
                src={DefaultAvatar}
                alt="profile picture"
              />
            )}
            <BiSolidCameraPlus className="absolute bottom-3 right-3 h-10 w-10 cursor-pointer text-[#f57922] bg-white rounded-full z-1 p-2 " />
            <input
              className="input-file absolute left-0 top-0 opacity-0 h-full w-full cursor-pointer z-10"
              type="file"
              accept="image/png, image/jpeg, image/webp, image/jpg"
              onChange={handleProfileFileChange}
            />
            {/* Loading */}
            {isPicLoading ? (
              <div className="absolute rounded-full flex items-center justify-center left-0 top-0 h-full w-full z-10 bg-black bg-opacity-50 ">
                <Loader />
              </div>
            ) : (
              ""
            )}
          </div>
          <p className="text-gray-700 mb-2">
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </p>
          {user.email ? (
            <p className="text-gray-700 mb-2">
              <strong>{user.email}</strong>
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <div className="text-center">
            {user.cvFile ? (
              <a
                className="block mx-auto mb-4 orange"
                href={user.cvFile}
                target="_blank"
              >
                View your CV
              </a>
            ) : (
              ""
            )}
            <h3 className="mb-5 h3">Upload Your CV</h3>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              id="cv-upload"
              className="block mx-auto mb-4"
            />
          </div>

          <span>{error}</span>

          <button
            disabled={isLoading || !cvFile}
            onClick={submitCv}
            className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition flex justify-center items-center gap-3"
          >
            {user.cvFile ? "Upload new CV" : "Submit CV"}{" "}
            {isLoading ? <Loader /> : ""}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
