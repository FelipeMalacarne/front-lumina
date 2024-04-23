import Navbar from "@/components/NavBar";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/auth/login");
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default AuthenticatedLayout;
