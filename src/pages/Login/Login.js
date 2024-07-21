import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { setUser, users } = useState("");
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

  // Function to get the current greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const specialChar = /[@$!%*?&]/.test(password);

    setPasswordValidations({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
    });

    return length && uppercase && lowercase && number && specialChar;
  };

  const handlePasswordChange = (setter, isEmailPassword) => (e) => {
    const value = e.target.value;
    setter(value);
    if (isEmailPassword) {
      validatePassword(value);
      setIsPasswordDirty(true); // Mark the password field as dirty once user starts typing
    }
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleLogin = () => {
    const currentPassword = role === "Admin" ? adminPassword : password;

    if (role === "Owner" && !validatePassword(currentPassword)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    // Match the password with the correct password from the context
    if (role === "Admin" && currentPassword !== "AdminPass1234&") {
      alert("Incorrect password for Admin role");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages

    // Ensure users array is defined and contains user objects
    if (users && users.length > 0) {
      const loggedInUser = users.find(
        (u) =>
          u.role === role && u.email === email && u.password === currentPassword
      );

      if (!loggedInUser) {
        setErrorMessage("Invalid email, password, or role selection");
        return;
      }

      setUser(loggedInUser);
      navigate("/tasks");
    } else {
      setErrorMessage("User data not found. Please check the TaskContext.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-left">
          <h1>Welcome to TaskWave: Ride the Wave of Productivity</h1>
          <p>Sign In To Your Account</p>
        </div>
        <div className="login-card-right">
          <h2>Hello !</h2>
          <p className="gradient-text">{getGreeting()}</p>
          <h3>Login Your Account</h3>
          <div className="login-form">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
                placeholder="Email Address"
                required
              />
            </label>
            <label>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange(setPassword, true)}
                placeholder="Password"
                required
              />
            </label>
            {isPasswordDirty && (
              <div className="password-requirements">
                <p className={passwordValidations.length ? "valid" : "invalid"}>
                  {passwordValidations.length ? "✓" : "✗"} At least 8 characters
                </p>
                <p
                  className={
                    passwordValidations.uppercase ? "valid" : "invalid"
                  }
                >
                  {passwordValidations.uppercase ? "✓" : "✗"} At least one
                  uppercase letter
                </p>
                <p
                  className={
                    passwordValidations.lowercase ? "valid" : "invalid"
                  }
                >
                  {passwordValidations.lowercase ? "✓" : "✗"} At least one
                  lowercase letter
                </p>
                <p className={passwordValidations.number ? "valid" : "invalid"}>
                  {passwordValidations.number ? "✓" : "✗"} At least one number
                </p>
                <p
                  className={
                    passwordValidations.specialChar ? "valid" : "invalid"
                  }
                >
                  {passwordValidations.specialChar ? "✓" : "✗"} At least one
                  special character (@$!%*?&)
                </p>
              </div>
            )}
            <label>
              Role:
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setErrorMessage("");
                  setIsPasswordDirty(false); // Reset password field dirty state
                  if (e.target.value !== "Admin") setAdminPassword("");
                }}
              >
                <option value="Owner">Owner</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
            {role === "Admin" && (
              <label>
                Password:
                <input
                  type="password"
                  value={adminPassword}
                  onChange={handlePasswordChange(setAdminPassword, false)}
                  placeholder="Password"
                  required
                />
              </label>
            )}
            <div className="login-actions">
              <button onClick={handleLogin}>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
