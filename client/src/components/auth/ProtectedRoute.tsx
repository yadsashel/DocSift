import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // إلا ما كاينش توكن، صيفطو لـ صفحة NotFound أو Login
  if (!token) {
    return <Navigate to="/notfound" replace />;
  }

  // إلا كاين، خليه يدوز يشوف الـ Dashboard
  return <Outlet />;
};

export default ProtectedRoute;