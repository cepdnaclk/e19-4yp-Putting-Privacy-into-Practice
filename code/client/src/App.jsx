import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import QuestionsGroup from "./pages/admin/QuestionsGroup";
import Questions from "./pages/admin/Questions";
import ManageUsers from "./pages/admin/ManageUsers";
import "./App.css";
import "@fontsource/inter";
import AuthRedirect from "./components/AuthRedirect";
import LevelBoard from "./pages/user/LevelBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes. */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/resetPassword" element={<ResetPassword />} />

        {/* Private routes for admin. */}
        <Route element={<AuthRedirect requiredRole="admin" />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/questions" element={<QuestionsGroup />} />
          <Route path="/admin/questions/:group" element={<Questions />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        {/* Private routes for users. */}
        <Route element={<AuthRedirect requiredRole="user" />}>
          <Route path="/user/levelBoard" element={<LevelBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
