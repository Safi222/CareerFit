import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Value = () => {
  const gridData = [
    {
      id: 1,
      title: "Simplicity",
      description:
        "Things being made beautiful simple are at the heart of everything we do.",
    },
    {
      id: 2,
      title: "Accessibility",
      description: " Serving everyone, everywhere, with ease.",
    },
    {
      id: 3,
      title: "Trust",
      description:
        "Building confidence through transparent, unbiased recommendations.",
    },
  ];

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (!token) {
      // Show the modal if the user is not logged in
      setIsModalOpen(true);
    } else {
      try {
        navigate("/jobs");
      } catch (error) {
        // If an error occurs during navigation
        alert("An error occurred while navigating to CvPilot.");
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  return (
    <div className="mb-16 mt-16 px-4">
      <h1 className="text-textColor text-2xl py-8 pb-12 font-bold text-center">
        The value that holds us true to account
      </h1>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-center gap-6">
          {gridData.map(({ id, title, description }) => (
            <div
              key={id}
              className="singleGrid rounded-lg hover:bg-[#eeedf7] p-6"
            >
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <span className="font-semibold text-textColor text-lg flex">
                    {title}
                  </span>
                </div>
              </div>
              <p className="text-sm text-Color opacity-70 py-4 font-semibold">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-8 flex flex-col md:flex-row justify-center bg-white p-10 rounded-lg">
        <div>
          <h1 className="text-black text-3xl font-bold">
            Ready to switch a career?
          </h1>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 text-white mt-4 py-2 px-6 rounded-lg font-bold  hover:bg-orange-400 transition-all duration-300 hover:translate-x-1 hover:translate-y-1"
          >
            Get started
          </button>
        </div>
      </div>

      {/* Modal for sign-in notification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold text-center">Sign In Required</h2>
            <p className="mt-2">You need to sign in to start.</p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-400 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Value;
