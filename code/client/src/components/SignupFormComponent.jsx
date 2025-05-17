import Input from "./input";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignupFormComponent() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

      <div className="flex justify-between mb-4 text-sm text-blue-600">
        <Link to="/">
          <button className="focus:outline-none ">Login</button>{" "}
        </Link>
        <button className="focus:outline-none border-b-2 border-blue-600">
          Sign Up
        </button>
      </div>

      <form>
        <Input label="Username" />
        <Input label="Password" />
        <Input label="Confirm Password" />
        <Button label="Sign Up" />
      </form>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <a href="/" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
