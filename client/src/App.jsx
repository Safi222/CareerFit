import Navbar from "./components/Navbar/Navbar";
import Search from "./components/SearchD/Search";
import Jobs from "./components/JobsD/Jobs";
import Value from "./components/ValueD/Value";
import Footer from "./components/FooterD/Footer";
import Slogan from "./components/SloganD/Slogan";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Slogan />
              <Search />
              <Jobs />
              <Value />
              <Footer />
            </div>
          }
        />
        <Route
          path="/jobs"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Jobs />
              <Footer />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="w-[85%] m-auto bg-white">
              <Navbar />
              <Login />
              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
