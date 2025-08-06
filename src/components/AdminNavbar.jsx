import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/tulis-logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { successAlert, errorAlert } from "../utils/Swal";
import { Moon, Sun } from 'lucide-react'
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function AdminNavbar() {
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      successAlert('Success!', 'Logout success');
      navigate('/')
    } catch (err) {
      console.error(err);
      errorAlert('Error!', err.message);
    }
  }
  return (
    <>
      {/* <!-- Navbar Start --> */}
      <div className="flex gap-3 items-center">
        <img width={100} src={Logo} />
        <div className="flex gap-3 ml-auto">
          <Link
            to="/admin"
            className="text-sky-700 px-4 py-2 rounded-full font-semibold">
            Home
          </Link>
          <Link
            to="/add-product"
            className="text-sky-700 px-4 py-2 rounded-full font-semibold">
            Add Product
          </Link>
          <button
            onClick={handleLogout}
            className="text-sky-700 px-4 py-2 rounded-full font-semibold">
            Logout
          </button>
          <button
            className="text-sky-700 px-4 py-2 rounded-full font-semibold"
            onClick={toggleTheme}>
            {theme === 'light' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div >
      <hr className="mt-5 border-gray-300" />
      {/* <!-- Navbar End --> */}
    </>
  )
}

export default AdminNavbar