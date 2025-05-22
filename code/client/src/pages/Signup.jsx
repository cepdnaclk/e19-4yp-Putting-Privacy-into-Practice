import { Link } from "react-router-dom";
import devImage from "../assets/frontImg.png";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useEffect, useRef, useState } from "react";
import AlertBanner from "../components/AlertBanner";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const currPasswordRef = useRef(null);

  const passwordMatch = !confirmPass || password === confirmPass;
  const lenWarning = password && password.length < 6;

  function handleSignUp(event) {
    if (document.activeElement) {
      document.activeElement.blur();
    }

    event.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg(!email ? "Email is required" : "Invalid email");
      return;
    }

    if (!username) {
      setErrorMsg("Username is required");
      return;
    }

    if (!password || password !== confirmPass || lenWarning || !passwordMatch) {
      setErrorMsg(!password ? "Password is required" : "Invalid Passwords");
      return;
    }

    axios
      .post("http://localhost:4000/api/auth/register", {
        username: username,
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMsg("Your account has been created successfully.");
        setErrorMsg("");
      })
      .catch((error) => {
        console.error("SignUp failed: ", error.response);
        if (error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
        setSuccessMsg("");
      });
  }

  function handleKeyDown(e, nextInputRef) {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current?.focus();
    }
  }

  useEffect(
    function () {
      if (!password) {
        setConfirmPass("");
      }
    },
    [password]
  );

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div className="w-1/2 relative flex flex-col items-center justify-center h-screen">
        {errorMsg && (
          <AlertBanner
            label={errorMsg}
            type="Error"
            onClose={() => setErrorMsg("")}
          />
        )}

        {successMsg && (
          <AlertBanner
            label={successMsg}
            type="Success"
            onClose={() => setSuccessMsg("")}
          />
        )}

        <div className="w-1/2 flex flex-col items-center justify-center">
          <div className="mb-10 text-center">
            <h1 className="text-2xl font-bold font-Inter">
              Let's create your account
            </h1>
            <p className="text-xs font-semibold">
              Already have an account?
              <Link to="/" className="ml-3">
                <span className="text-blue-900 font-bold">Sign in</span>
              </Link>
            </p>
          </div>

          <form
            className="w-full"
            onSubmit={handleSignUp}
            onFocus={() => {
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            <FormField
              label="Email"
              placeholder="email@domain"
              type="text"
              value={email}
              onChange={setEmail}
              ref={emailRef}
              handleKeyDown={(e) => handleKeyDown(e, usernameRef)}
            />
            <FormField
              label="Username"
              placeholder="jhonDoe"
              type="text"
              value={username}
              onChange={setUsername}
              ref={usernameRef}
              handleKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
            <FormField
              label="Password"
              placeholder="+6 characters"
              type="password"
              value={password}
              onChange={setPassword}
              lenWarning={lenWarning}
              ref={passwordRef}
              handleKeyDown={(e) => handleKeyDown(e, currPasswordRef)}
            />
            <FormField
              label="Confirm password"
              placeholder="+6 characters"
              type="password"
              value={confirmPass}
              onChange={setConfirmPass}
              passwordMatch={passwordMatch}
              disabled={!password}
              ref={currPasswordRef}
            />
            <Button className="w-auto px-6">Sign up</Button>
          </form>
        </div>
      </div>

      <div className="w-1/2 h-screen">
        <img
          src={devImage}
          alt="Developer"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
