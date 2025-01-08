import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import google_icon from "../../Assets/google_icon.png";

const Register = () => {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUserProfile } = useContext(AuthContext);
  const serverUri = import.meta.env.VITE_SERVER_URI;
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${serverUri}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();
      if (data.status === "fail") {
        setError(data.data.title);
        throw new Error(data.data.title);
      } else {
        localStorage.setItem("token", data.data.token); // Save token to localStorage
        await fetchUserProfile();
        naviagte("/profile");
      }
    } catch (error) {
      console.log("Error:", error);
    }

    // Log the input values to the console instead of sending them
    console.log("Entered data:", { firstName, lastName, email, password });
  };

  const handleGoogleRegister = async () => {
    window.location.href = `${serverUri}/auth/google`;
  };

  useEffect(() => {
    if (tokenParam) {
      localStorage.setItem("token", tokenParam);
      fetchUserProfile().then(() => {
        navigate("/profile");
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Create Account
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center bg-greyIsh text-black p-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            <img src={google_icon} alt="google" className="h-5 w-5 mr-2" />
            Sign Up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
