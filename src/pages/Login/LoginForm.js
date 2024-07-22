import React from "react";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  adminPassword,
  setAdminPassword,
  role,
  setRole,
  errorMessage,
  handleLogin,
  handlePasswordChange,
  isPasswordDirty,
  passwordValidations,
  setErrorMessage, // Include setErrorMessage in the props
}) => (
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
        onChange={(e) => handlePasswordChange(e, setPassword, true)}
        placeholder="Password"
        required
      />
    </label>
    {isPasswordDirty && (
      <div className="password-requirements">
        <p className={passwordValidations.length ? "valid" : "invalid"}>
          {passwordValidations.length ? "✓" : "✗"} At least 8 characters
        </p>
        <p className={passwordValidations.uppercase ? "valid" : "invalid"}>
          {passwordValidations.uppercase ? "✓" : "✗"} At least one uppercase
          letter
        </p>
        <p className={passwordValidations.lowercase ? "valid" : "invalid"}>
          {passwordValidations.lowercase ? "✓" : "✗"} At least one lowercase
          letter
        </p>
        <p className={passwordValidations.number ? "valid" : "invalid"}>
          {passwordValidations.number ? "✓" : "✗"} At least one number
        </p>
        <p className={passwordValidations.specialChar ? "valid" : "invalid"}>
          {passwordValidations.specialChar ? "✓" : "✗"} At least one special
          character (@$!%*?&)
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
        <option className="role-option" value="Owner">
          Owner
        </option>
        <option value="Admin">Admin</option>
      </select>
    </label>
    {role === "Admin" && (
      <label>
        Password:
        <input
          type="password"
          value={adminPassword}
          onChange={(e) => handlePasswordChange(e, setAdminPassword, false)}
          placeholder="Password"
          required
        />
      </label>
    )}
    <div className="login-actions">
      <button onClick={handleLogin}>SUBMIT</button>
    </div>
  </div>
);

export default LoginForm;
