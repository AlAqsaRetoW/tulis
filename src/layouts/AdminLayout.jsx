import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

function AdminLayout() {
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="container mx-auto pt-5">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout;