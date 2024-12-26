import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-7 py-8">
      <div>
        <div className="border-t border-gray-300 my-9"></div> 
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About Us
        </h1>
        <h2 className="text-xl text-gray-600 mb-9">
          We are here to help you find your perfect career fit.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 ">
        <div className="p-6 bg-white rounded-lg shadow-lg ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
          <p className="text-gray-600">
            At CareerFit, our mission is to provide personalized career solutions by announcing jobs and assisting you with CV analysis Using CvPilot, that is provide you with job recommendations, and more to help you land the job of your dreams.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600">
            We aim to bridge the gap between job seekers and employers by providing cutting-edge technology and a user-friendly platform that empowers individuals to achieve career success.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h3>
          <p className="text-gray-600">
            Our team is composed of passionate professionals from diverse backgrounds, dedicated to helping you enhance your career journey with expert guidance and tailored solutions.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Why Choose CareerFit?
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          CareerFit is more than just a job search platform. We provide personalized support, comprehensive CV assessments, and insightful job recommendations to ensure you're always on the path to success.
        </p>
        <button className="bg-orange-400 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition">
          Get Started Today!
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
