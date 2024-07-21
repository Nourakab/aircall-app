const validatePassword = (password) => {
  const length = password.length >= 8;
  const uppercase = /[A-Z]/.test(password);
  const lowercase = /[a-z]/.test(password);
  const number = /\d/.test(password);
  const specialChar = /[@$!%*?&]/.test(password);

  return {
    length,
    uppercase,
    lowercase,
    number,
    specialChar,
  };
};

export default validatePassword;
