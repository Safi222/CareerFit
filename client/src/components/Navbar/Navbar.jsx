import React from 'react';

const Navbar = () => {
  return (
    <div className="navBar flex justify-between items-center px-12 py-6 bg-white ">
      
      <div className="logoDiv">
        <h1 className="logo text-2xl font-bold text-orange-500 cursor-pointer">
          <strong>Career</strong>Fit
        </h1>
      </div>

      
      <ul className="menu flex gap-3">
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Jobs
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Companies
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          About
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Contact
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Blog
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Login
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          Register
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
