/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { useContext, useState } from "react";

const Profile = (props) => {
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [cvFile, SetCvFile] = useState("");
  const [error, setError] = useState("");

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
      formData.append("cvFile", cvFile); // "cv" is the key expected by the API

      const res = await fetch(`${serverUri}/users/cv`, {
        method: "POST", // Change to POST if required
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setError("");
    } catch (err) {
      setError("Please upload a CV file.");
    }
  };

  // const user = props.user;
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
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          {/* <p className="text-gray-700">
            <strong>Role:</strong> {user.role}
          </p> */}
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <div>
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
            onClick={submitCv}
            className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
          >
            Submit CV
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
