import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate(); 

  const handleGetStarted = () => {
    navigate("/jobs"); 
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 py-12 bg-gray-50">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
          About Us
        </h1>
        <p className="text-base sm:text-lg text-gray-600 sm:w-3/4 md:w-2/3 mx-auto">
          CareerFit is an innovative platform designed to help you achieve your career aspirations by connecting you with recent and tailored job opportunities. Powered by CVPilot, an AI-driven tool, CareerFit assesses your CV, offers personalized improvement suggestions, and recommends roles that align with your skills and goals.
        </p>
      </div>

    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-sm text-gray-600">
            At CareerFit, our mission is to provide personalized career solutions by announcing jobs and assisting you with CV analysis using CvPilot, providing you with job recommendations, and more to help you land the job of your dreams.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-sm text-gray-600">
            We aim to bridge the gap between job seekers and employers by providing cutting-edge technology and a user-friendly platform that empowers individuals to achieve career success.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Our Team</h3>
          <p className="text-sm text-gray-600">
            Our team is composed of passionate professionals from diverse backgrounds, dedicated to helping you enhance your career journey with expert guidance and tailored solutions.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Why Choose CareerFit?
        </h3>
        <p className="text-base text-gray-600 mb-6 mx-auto sm:w-3/4 md:w-2/3">
          CareerFit is more than just a job search platform. We provide personalized support, comprehensive CV assessments, and insightful job recommendations to ensure you're always on the path to success.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-all duration-300"
        >
          Get Started Today!
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
