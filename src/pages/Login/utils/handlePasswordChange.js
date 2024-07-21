import validatePassword from "./validatePassword";

const handlePasswordChange =
  (setter, setPasswordValidations, setIsPasswordDirty, setErrorMessage) =>
  (e) => {
    const { value } = e.target;
    setter(value);
    const validations = validatePassword(value);
    setPasswordValidations(validations);
    setIsPasswordDirty(true); // Mark the password field as dirty once user starts typing
    setErrorMessage(""); // Clear error message when user starts typing
  };

export default handlePasswordChange;
