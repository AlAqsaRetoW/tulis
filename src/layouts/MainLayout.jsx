import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function MainLayout() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen theme-bg theme-text ${
        theme === "dark" ? "dark" : ""
      }`}
    >
      <div className="container mx-auto pt-5">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
