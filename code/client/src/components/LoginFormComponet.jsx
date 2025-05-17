import Input from "./input";
import Button from "./Button";
import { Link } from "react-router-dom";
export default function LoginFormComponet() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <div className="flex justify-between mb-4 text-sm text-blue-600">
        <button className="focus:outline-none border-b-2 border-blue-600">
          Login
        </button>
        <Link to="/signup">
          <button className="focus:outline-none">Sign Up</button>
        </Link>
      </div>

      <form>
        <Input label="Username" />
        <Input label="Password" />
        <Button label="Login" />
      </form>

      <p className="text-center text-sm mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
