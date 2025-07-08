import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/admin/Dashboard";
import QuestionsGroup from "./pages/admin/QuestionsGroup";
import Questions from "./pages/admin/Questions";
import ManageUsers from "./pages/admin/ManageUsers";
import Resources from "./pages/admin/resources/Resources";
import UserDetails from "./pages/admin/UserDetails";
import "./App.css";
import "@fontsource/inter";
import AuthRedirect from "./components/AuthRedirect";
import LevelBoard from "./pages/user/LevelBoard";
import LevelInfo from "./pages/user/LevelInfo";
import QuestionDisplay from "./pages/user/ChallengeDisplay";
import ResourcesGroup from "./pages/admin/resources/ResourcesGroup";
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
          <Route path="/admin/questions/:principle" element={<Questions />} />
          <Route path="/admin/resources" element={<ResourcesGroup />} />
          <Route path="/admin/resources/:principle" element={<Resources />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/users/:id" element={<UserDetails />} />
        </Route>

        {/* Private routes for users. */}
        <Route element={<AuthRedirect requiredRole="user" />}>
          <Route path="/levelBoard" element={<LevelBoard />} />
          <Route path="/levelBoard/:principle/info" element={<LevelInfo />} />
          <Route
            path="/levelBoard/:principle/challenge"
            element={<QuestionDisplay />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
