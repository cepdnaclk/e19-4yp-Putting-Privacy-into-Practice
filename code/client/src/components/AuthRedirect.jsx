import { useEffect, useState } from "react";
import api from "../lib/axios";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRedirect() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    api
      .get("/api/auth/check")
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) {
    return <p>Loading.</p>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" />;
}
