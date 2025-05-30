import { Link } from "react-router-dom";
import devImage from "../assets/frontImg.png";
import Button from "../components/Button";
import FormField from "../components/FormField";
import AlertBanner from "../components/AlertBanner";
import { useRef, useState } from "react";
import axios from "axios";
import { config } from "../utils/config";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  function handleKeyDown(e, nextInputRef) {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current?.focus();
    }
  }

  function handleSignIn(e) {
    e.preventDefault();

    axios
      .post(
        `${config.serverBaseUrl}/api/auth/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("SignIn failed: ", error.response);
        if (error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
      });
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

      <div className="w-1/2 relative flex items-center justify-center h-screen">
        {errorMsg && (
          <AlertBanner
            label={errorMsg}
            type="Error"
            onClose={() => setErrorMsg("")}
          />
        )}

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

          <form className="w-full" onSubmit={handleSignIn}>
            <FormField
              label="Email"
              type="text"
              value={email}
              onChange={setEmail}
              required={true}
              ref={emailRef}
              handleKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
            <FormField
              label="password"
              type="password"
              value={password}
              onChange={setPassword}
              required={true}
              ref={passwordRef}
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
