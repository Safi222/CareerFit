import { useParams, useNavigate } from "react-router-dom";

const dummyUsers = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    role: "Admin",
    dashboard: "/dashboard/john",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    role: "Manager",
    dashboard: "/dashboard/jane",
  },
  {
    email: "alex.jones@example.com",
    name: "Alex Jones",
    role: "Developer",
    dashboard: "/dashboard/alex",
  },
  {
    email: "emily.white@example.com",
    name: "Emily White",
    role: "Designer",
    dashboard: "/dashboard/emily",
  },
  {
    email: "michael.brown@example.com",
    name: "Michael Brown",
    role: "Tester",
    dashboard: "/dashboard/michael",
  },
];

const Dashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const user = dummyUsers.find((user) => user.dashboard.endsWith(userId));

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <button
            className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600 transition duration-200"
            onClick={() => navigate("/")}
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
        <h1 className="text-xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-200"
        >
          Logout
        </button>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-700 mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      </main>

      <footer className="mt-10 text-center text-gray-500">
        <p>&copy; 2024 CareerFit Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
