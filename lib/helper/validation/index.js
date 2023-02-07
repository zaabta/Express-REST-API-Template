const nameIsValid = (name) => {
  if (str.match(/^[A-Z][a-zA-Z]+$|^[A-Z]\W$/g)) return name;
  return null;
};

const emailIsValid = (email) => {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    return email;
  return null;
};

const passwordIsMatch = (password, passwordConfirmation) => {
  if (!password.localeCompare(passwordConfirmation)) return password;
  return null;
};

const passwordIsValid = (password) => {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
      password
    )
  )
    return password;
  return null;
};


module.exports = {
    nameIsValid,
    emailIsValid,
    passwordIsMatch,
    passwordIsValid
}
