import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const links = [
    { title: "jobs", url: "/jobs" },
    { title: "cvPilot", url: "/cvpilot" },
    { title: "About", url: "/about" },
  ];
  const { isLoggedIn, logout } = useContext(AuthContext);

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
            className="menuList text-gray-600 p-0 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
          >
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                (isActive ? "active" : "") + " flex px-4 py-2"
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
        {/* Signin and Signup */}
        {isLoggedIn ? (
          <>
            <li className="menuList text-gray-600 p-0 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
              <NavLink
                to={"/profile"}
                className={({ isActive }) =>
                  (isActive ? "active" : "") + " flex px-4 py-2"
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="menuList text-gray-600 p-0 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
              <span className="flex px-4 py-2" onClick={logout}>
                Sign Out
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="menuList text-gray-600 p-0 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  (isActive ? "active" : "") + " flex px-4 py-2"
                }
              >
                Sign in
              </NavLink>
            </li>
            <li className="menuList text-gray-600 p-0 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
              <NavLink
                to={"/register"}
                className={({ isActive }) =>
                  (isActive ? "active" : "") + " flex px-4 py-2"
                }
              >
                Sign up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
