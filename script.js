const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailMsg = document.getElementById("emailMsg");
const passwordMsg = document.getElementById("passwordMsg");

const EMAIL_ERROR = "Make sure email is more than 3 characters and has @ and a .";
const PASSWORD_ERROR = "Make sure password is more than 8 characters.";
const SUCCESS_TEXT = "All good to go";

function isEmailValid() {
  const v = emailInput.value;
  return v.length > 3 && v.includes("@") && v.includes(".");
}

function isPasswordValid() {
  return passwordInput.value.length >= 8;
}

function showMessage(el, text, type) {
  el.textContent = text;
  el.className = text ? "message " + type : "message";
}

function updateMessages(touchedEmail, touchedPassword) {
  const emailOk = isEmailValid();
  const passwordOk = isPasswordValid();

  if (touchedEmail) {
    showMessage(emailMsg, emailOk ? "" : EMAIL_ERROR, "error");
  }

  if (touchedPassword) {
    showMessage(passwordMsg, passwordOk ? "" : PASSWORD_ERROR, "error");
  }

  if (emailOk && passwordOk) {
    showMessage(emailMsg, "", "error");
    showMessage(passwordMsg, SUCCESS_TEXT, "success");
  } else if (passwordOk && passwordMsg.classList.contains("success")) {
    showMessage(passwordMsg, "", "error");
  }
}

let emailTouched = false;
let passwordTouched = false;

function onEmailChange() {
  emailTouched = true;
  updateMessages(true, passwordTouched);
}
function onPasswordChange() {
  passwordTouched = true;
  updateMessages(emailTouched, true);
}

emailInput.addEventListener("input", onEmailChange);
emailInput.addEventListener("change", onEmailChange);
passwordInput.addEventListener("input", onPasswordChange);
passwordInput.addEventListener("change", onPasswordChange);

function resetForm() {
  form.reset();
  emailTouched = false;
  passwordTouched = false;
  showMessage(emailMsg, "", "error");
  showMessage(passwordMsg, "", "error");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailTouched = true;
  passwordTouched = true;
  updateMessages(true, true);

  if (!isEmailValid() || !isPasswordValid()) return;

  const confirmed = window.confirm("Are you sure you want to submit?");

  if (confirmed) {
    alert("Successful signup!");
    resetForm();
  } else {
    resetForm();
    window.location.href = window.location.pathname;
  }
});