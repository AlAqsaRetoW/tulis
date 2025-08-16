import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/tulis-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { successAlert, errorAlert } from "../utils/Swal";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      successAlert("Success!", "Logout success"); 
      navigate("/");
    } catch (err) {
      console.error(err);
      errorAlert("Error!", err.message);
    }
  };
  return (
    <>
      {/* <!-- Navbar Start --> */}
      <div className="flex gap-3 items-center">
        <img width={100} src={Logo} alt="Tulis Logo" />
        {user ? (
          <div className="flex gap-3 ml-auto items-center">
            <Link
              to="/"
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Cart
            </Link>

            <button
              onClick={handleLogout}
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Logout
            </button>
            <button
              className="theme-accent px-3 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        ) : (
          <div className="flex gap-3 ml-auto items-center">
            <Link
              to="/"
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
            >
              Login
            </Link>
            <button
              className="theme-accent px-3 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        )}
      </div>
      <hr className="mt-5 theme-border" />
      {/* <!-- Navbar End --> */}
    </>
  );
}

export default Navbar;
