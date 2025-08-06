import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="container mx-auto mt-5">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout;