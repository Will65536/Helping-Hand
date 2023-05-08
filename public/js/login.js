let errorMessage = document.getElementById("error_message");
let login = document.getElementById("login_form");
if (login) {
  login.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      let email = document.getElementById("email").value;
      email = checkString(email, "email");
      checkEmail(email);

      let password = document.getElementById("password").value;
      password = checkString(password, "password");
      checkPassword(password);

      errorMessage.hidden = true;
      document.getElementById("login_form").submit();
    } catch (e) {
      errorMessage.hidden = false;
      errorMessage.innerHTML = e;
    }
  });
}

function checkString(strVal, varName) {
  if (!strVal) throw `You must supply a ${varName}!`;
  if (typeof strVal !== "string") throw `${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

function checkEmail(email) {
  email = email.toLowerCase();
  if (email.length < 5) throw "Email cannot be less than 5 characters";
  if (email.length > 50) throw "Email cannot be more than 50 characters";
  if (email.trim().length === 0) throw "Email cannot be empty";
  if (!isNaN(email)) throw "Email cannot be a number";
  if (!email.includes("@")) throw "Email must contain @";
  if (!email.includes(".")) throw "Email must contain .";
}

function checkPassword(password) {
  if (password.length < 8) throw "Password cannot be less than 8 characters";
  if (password.length > 50) throw "Password cannot be more than 50 characters";
  if (password.trim().length === 0) throw "Password cannot be empty";
  if (!isNaN(password)) throw "Password cannot be a number";
  if (!password.match(/[A-Z]/))
    throw "Password must contain at least one uppercase character";
  if (!password.match(/[0-9]/))
    throw "Password must contain at least one number";
  if (
    !password.match(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,.?'";:/<>\-])\S{8,}$/
    )
  )
    throw "Password must contain at least one special character";
}
