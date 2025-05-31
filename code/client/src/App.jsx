import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Principle from "./pages/Principle";
import "./App.css";
import "@fontsource/inter";
import AuthRedirect from "./components/AuthRedirect";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes. */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Private routes. */}
        <Route element={<AuthRedirect />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/principle" element={<Principle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
