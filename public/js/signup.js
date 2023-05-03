function onSubmitClicked(){
  let errorMessage = document.getElementById('error_message');
  let signupform=document.getElementById('signup_form')
  if(signupform)
  {
  registration.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  try{
    let firstName = document.getElementById('first_name').value;
    firstName = checkString(firstName, 'first name');
    checkName(firstName);

    let lastName = document.getElementById('last_name').value;
    lastName = checkString(lastName, 'last name');
    checkName(lastName);

    let email = document.getElementById('email').value;
    email = checkString(email, 'email');
    checkEmail(email);

    let password = document.getElementById('password').value;
    password = checkString(password, 'password');
    checkPassword(password);

    let repeatPassword = document.getElementById('repeat_password').value;
    repeatPassword = checkString(repeatPassword, 'repeat password');
    if(password !== repeatPassword) throw "Passwords do not match";

    errorMessage.hidden = true;
    document.getElementById('signup_form').submit();
  }catch(e){
    errorMessage.hidden = false;
    errorMessage.innerHTML = e;
  }
  })}
}

function checkString(strVal, varName) {
  if (!strVal) throw `You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
}

function checkName(name){
  if(name.length < 2) throw "Name cannot be less than 2 characters";
  if(name.length > 25) throw "Name cannot be more than 25 characters";
  if(name.trim().length === 0) throw "Name cannot be empty";
  if(!isNaN(name)) throw "Name cannot be a number";
}

function checkEmail(email){
  email = email.toLowerCase();
  if(email.length < 5) throw "Email cannot be less than 5 characters";
  if(email.length > 50) throw "Email cannot be more than 50 characters";
  if(email.trim().length === 0) throw "Email cannot be empty";
  if(!isNaN(email)) throw "Email cannot be a number";
  if(!email.includes("@")) throw "Email must contain @";
  if(!email.includes(".")) throw "Email must contain .";  
}

function checkPassword(password){
  if(password.length < 8) throw "Password cannot be less than 8 characters";
  if(password.length > 50) throw "Password cannot be more than 50 characters";
  if(password.trim().length === 0) throw "Password cannot be empty";
  if(!isNaN(password)) throw "Password cannot be a number";
  if(!password.match(/[A-Z]/)) throw "Password must contain at least one uppercase character";
  if(!password.match(/[0-9]/)) throw "Password must contain at least one number";
  if(!password.match(/[!@#$%^&*]/)) throw "Password must contain at least one special character";
}
signupform.submit()