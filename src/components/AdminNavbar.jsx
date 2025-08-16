import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/tulis-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { successAlert, errorAlert } from "../utils/Swal";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function AdminNavbar() {
  const navigate = useNavigate();

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
        <div className="flex gap-3 ml-auto items-center">
          <Link
            to="/admin"
            className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/add-product"
            className="theme-accent px-4 py-2 rounded-full font-semibold hover:theme-accent-bg hover:text-white transition-all duration-300"
          >
            Add Product
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
      </div>
      <hr className="mt-5 theme-border" />
      {/* <!-- Navbar End --> */}
    </>
  );
}

export default AdminNavbar;
