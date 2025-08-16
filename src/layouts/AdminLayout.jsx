import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function AdminLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen theme-bg theme-text ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="container mx-auto pt-5">
        <AdminNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
