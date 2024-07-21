const handleLogin = ({
  role,
  email,
  password,
  adminPassword,
  users,
  setErrorMessage,
  setUser,
  navigate,
  validatePassword,
}) => {
  const currentPassword = role === "Admin" ? adminPassword : password;

  if (
    role === "Owner" &&
    !Object.values(validatePassword(currentPassword)).every(Boolean)
  ) {
    setErrorMessage(
      "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character."
    );
    return;
  }

  if (role === "Admin" && currentPassword !== "AdminPass1234&") {
    alert("Incorrect password for Admin role");
    return;
  }

  setErrorMessage(""); // Clear any previous error messages

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
    navigate("/"); // Redirect to the homepage
  } else {
    setErrorMessage("User data not found. Please check the UserContext.");
  }
};

export default handleLogin;
