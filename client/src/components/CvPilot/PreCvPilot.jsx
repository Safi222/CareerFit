import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PreCvPilot = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExploreClick = () => {
    if (!token) {
      // if the user is  not login
      setIsModalOpen(true);
    } else {
      try {
        navigate("/CvPilot");
      } catch (error) {
        //  erro
        alert("An error occurred while navigating to CvPilot.");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/login");
  };

  const close = () => {
    setIsModalOpen(false);

    navigate("/");
  };

  return (
    <div className="text-center my-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Use CvPilot to Improve Your CV
      </h2>
      <p className="text-gray-600 mb-6">
        CvPilot is an AI-powered tool designed to enhance your CV by providing
        personalized feedback and job recommendations.
      </p>
      <button
        onClick={handleExploreClick}
        className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
      >
        Explore CvPilot
      </button>

      {/* Modal for sign-in alert */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign In Required
            </h2>
            <p className="text-gray-600 mb-6">
              You need to sign in to explore CvPilot.
            </p>
            <button
              onClick={closeModal}
              className="bg-green-600 font-bold text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              go to sign in
            </button>
            <button
              onClick={close}
              className="bg-red-500 font-bold text-white px-4 py-2 ml-4 rounded-lg hover:bg-red-600 transition"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreCvPilot;
