import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import google_icon from "../../Assets/google_icon.png";

const Login = () => {
  const [email, setEmail] = useState("ahmed@gmail.com");
  const [password, setPassword] = useState("passWord&123");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const serverUri = import.meta.env.VITE_SERVER_URI;

  const dummyUsers = [
    {
      email: "john.doe@example.com",
      password: "Password123",
      dashboard: "/dashboard/john",
    },
    {
      email: "jane.smith@example.com",
      password: "MyPassword456",
      dashboard: "/dashboard/jane",
    },
    {
      email: "alex.jones@example.com",
      password: "SecurePass789",
      dashboard: "/dashboard/alex",
    },
    {
      email: "emily.white@example.com",
      password: "TestPassword321",
      dashboard: "/dashboard/emily",
    },
    {
      email: "michael.brown@example.com",
      password: "1234abcd",
      dashboard: "/dashboard/michael",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate(user.dashboard);
    } else {
      setError("Invalid email or password");
    }
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

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Save token to localStorage
      console.log("Token saved:", data.token);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Call fetchData when the component mounts

  const handleGoogleLogin = () => {
    window.location.href = `${serverUri}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-greyIsh text-black p-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            <img src={google_icon} alt="google" className="h-5 w-5 mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
