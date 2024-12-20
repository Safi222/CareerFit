import React from 'react';
import img from '../../assets/CareerFit.png';

const Slogan = () => {
  return (
    <div 
      className="relative w-full h-[650px] bg-cover bg-center" 
      style={{
        backgroundImage: `url(${img})`, 
      }}
    >
      {/* Slogan Text Positioned on the Left */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 text-black p-8 w-[50%]">
        <h1 className="text-5xl font-bold mb-4">Empowering Your Career Journey</h1>
        <p className="text-lg mb-6">
          Discover opportunities that align with your skills. Let CareerFit guide you to success.
        </p>
        <button className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-400 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Slogan;
