import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Outlet, Navigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function AuthRedirect({ requiredRole }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    api
      .get("/api/auth/check")
      .then((res) => {
        setAuthenticated(true);
        setUserRole(res.data.user.role);
      })
      .catch(() => {
        setAuthenticated(false);
        setUserRole(null);
      })
      .finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
