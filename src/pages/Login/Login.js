import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Login.css";
import LoginForm from "./LoginForm";
import Greeting from "./Greeting";
import validatePassword from "./utils/validatePassword";
import handlePasswordChange from "./utils/handlePasswordChange";
import handleLogin from "./utils/handleLogin";

const Login = () => {
  const { setUser, users } = useContext(UserContext);
  const [role, setRole] = useState("Owner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState(""); // Separate state for admin password
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const [isPasswordDirty, setIsPasswordDirty] = useState(false); // State to track if user has started typing in the password field
  const navigate = useNavigate();

  const handlePasswordChangeWrapper = (e, setter, isEmailPassword) =>
    handlePasswordChange(
      setter,
      setPasswordValidations,
      setIsPasswordDirty,
      setErrorMessage
    )(e);

  const handleLoginWrapper = () =>
    handleLogin({
      role,
      email,
      password,
      adminPassword,
      users,
      setErrorMessage,
      setUser,
      navigate,
      validatePassword,
    });

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-left">
          <h1>Welcome to the Aircall App</h1>
          <p>Sign In To Your Account</p>
        </div>
        <div className="login-card-right">
          <h2>Hello !</h2>
          <Greeting />
          <h3>Login Your Account</h3>
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            adminPassword={adminPassword}
            setAdminPassword={setAdminPassword}
            role={role}
            setRole={setRole}
            errorMessage={errorMessage}
            handleLogin={handleLoginWrapper}
            handlePasswordChange={handlePasswordChangeWrapper}
            isPasswordDirty={isPasswordDirty}
            passwordValidations={passwordValidations}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
