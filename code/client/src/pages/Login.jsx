import { Link } from "react-router-dom";
import devImage from "../assets/frontImg.png";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-1/2 h-screen">
        <img
          src={devImage}
          alt="Developer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-1/2 flex items-center justify-center h-screen">
        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-xs font-semibold">
              Don't have an account?{"   "}
              <Link to="/signup" className="ml-3">
                <span className="text-blue-900 font-bold">Sign up</span>
              </Link>
            </p>
          </div>

          <form className="w-full">
            <FormField
              label="Username"
              type="text"
              value={username}
              onChange={setUsername}
              required={true}
            />
            <FormField
              label="password"
              type="password"
              value={password}
              onChange={setPassword}
              required={true}
            />
            <div className="flex justify-end">
              <Link
                to="/resetPassword"
                className="text-xs text-gray-500 font-bold hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button className="w-auto px-6">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
