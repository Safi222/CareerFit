import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navBar flex justify-between items-center px-6 py-4 bg-white flex-wrap md:flex-none">
      <div className="logoDiv">
        <h1 className="logo text-2xl font-bold text-orange-500 cursor-pointer">
          <NavLink to={"/"}>
            <strong>Career</strong>Fit
          </NavLink>
        </h1>
      </div>

      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      <ul
        className={`menu flex-col md:flex md:flex-row md:gap-3 w-full md:w-auto ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/jobs"}>Jobs</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/companies"}>CvPilot</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/contact"}>Contact</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/blog"}>Blog</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/login"}>Login</NavLink>
        </li>
        <li className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <NavLink to={"/register"}>Register</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
