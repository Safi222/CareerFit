import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { title: "jobs", url: "/jobs" },
    { title: "cvPilot", url: "/cvpilot" },
    { title: "About", url: "/about" },
    { title: "Login", url: "/login" },
    { title: "Register", url: "/register" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white flex-wrap md:flex-none">
      <div className="logoDiv">
        <h1 className="logo text-2xl font-bold text-orange-500 cursor-pointer">
          <NavLink to={"/"}>
            <strong>Career</strong>Fit
          </NavLink>
        </h1>
      </div>

      <button
        onClick={toggleMenu}
        className="text-gray-600 focus:outline-none md:hidden"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <ul
        className={`menu flex-col md:flex md:flex-row md:gap-3 w-full md:w-auto ${
          isOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {links.map((link) => (
          <li
            key={link.title}
            className="menuList text-gray-600 px-4 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            <NavLink to={link.url}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

