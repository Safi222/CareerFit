import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import google_icon from "../../Assets/google_icon.png";
import { AuthContext } from "../../AuthContext";

const Login = () => {
  const [searchParams] = useSearchParams();
  const tokenParam = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchUserProfile } = useContext(AuthContext);

  const serverUri = import.meta.env.VITE_SERVER_URI;

  const handleLogin = (e) => {
    e.preventDefault();

    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${serverUri}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.status == "fail") {
        setError(data.data.title);
        throw new Error(data.data.title);
      } else {
        localStorage.setItem("token", data.data.token); // Save token to localStorage
        await fetchUserProfile();
        navigate("/profile");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition duration-200"
          >
            Sign in
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-greyIsh text-black p-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            <img src={google_icon} alt="google" className="h-5 w-5 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
