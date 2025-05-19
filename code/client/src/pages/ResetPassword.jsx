import { Link } from "react-router-dom";
import devImage from "../assets/frontImg.png";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useState } from "react";
import AlertBanner from "../components/AlertBanner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function handleReset(event) {
    event.preventDefault();
    if (email && !email.includes("@")) {
      setErrorMsg("Invalid Email address");
      return;
    }

    setSuccessMsg("Reset Link has been sent to your email");
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-1/2 h-screen">
        <img
          src={devImage}
          alt="Developer"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-1/2 flex items-center justify-center h-screen">
        {errorMsg && (
          <AlertBanner
            type="Error"
            label={errorMsg}
            onClose={() => setErrorMsg("")}
          />
        )}

        {successMsg && (
          <AlertBanner
            type="Success"
            label={successMsg}
            onClose={() => setSuccessMsg("")}
          />
        )}

        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
          </div>

          <form className="w-full" onSubmit={handleReset}>
            <FormField
              label="E-mail address"
              type="text"
              value={email}
              onChange={setEmail}
            />
            <Button className="w-auto px-6">Send Password Reset Link</Button>
          </form>
          <div className="flex justify-center">
            <Link
              to="/"
              className="text-xs text-gray-500 font-bold hover:underline"
            >
              Back to Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
