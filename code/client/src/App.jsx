import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Questions from "./pages/Questions/Create";
import Show from "./pages/Questions/Show";
import "./App.css";
import "@fontsource/inter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questions/create" element={<Questions />} />
        <Route path="/questions" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
