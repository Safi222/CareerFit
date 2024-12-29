import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import img from '../../Assets/CareerFit.png';

const Slogan = () => {
  return (
    <div 
      className="relative w-full h-[650px] bg-cover bg-center" 
      style={{
        backgroundImage: `url(${img})`, 
      }}
    >
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black p-4 sm:p-8 w-full sm:w-[50%]">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Empowering Your Career Journey</h1>
        <p className="text-base sm:text-lg mb-6">
          Discover opportunities that align with your skills. Let CareerFit guide you to success.
        </p>

        <Link to="/about">  
          <button className="bg-orange-500 text-white py-2 px-4 sm:py-2 sm:px-6 rounded-lg hover:bg-orange-400 transition-all duration-300">
            Learn More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Slogan;
