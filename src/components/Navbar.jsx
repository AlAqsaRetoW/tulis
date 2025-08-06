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
        <img width={100} src={Logo} />
        {user ? (
          <div className="flex gap-3 ml-auto">
            <Link
              to="/"
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Cart
            </Link>

            <button
              onClick={handleLogout}
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Logout
            </button>
            <button
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>
        ) : (
          <div className="flex gap-3 ml-auto">
            <Link
              to="/"
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Home
            </Link>
            <Link
              to="/register"
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            >
              Login
            </Link>
          </div>
        )}
      </div>
      <hr className="mt-5 border-gray-300" />
      {/* <!-- Navbar End --> */}
    </>
  );
}

export default Navbar;
