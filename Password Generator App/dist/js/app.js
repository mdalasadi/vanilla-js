const resultEl = document.getElementById("password-text");
const generatePassBtn = document.getElementById("generate-password");
const clipboardPassBtn = document.getElementById("copy-password");

const lengthEl = document.getElementById("pass-length");
const upperCaseEl = document.getElementById("upper-case");
const lowerCaseEl = document.getElementById("lower-case");
const numberEl = document.getElementById("numbers");
const symbolEl = document.getElementById("symbols");

// Generate the Password
function generatePass([...char]) {
  resultEl.value = "";
  const passLength = lengthEl.value;
  if (passLength >= 4 && passLength <= 30) {
    for (let i = 1; i <= passLength; i++) {
      resultEl.value += char[Math.floor(Math.random() * char.length)] || "";
    }
  } else {
    alert("The password length should be between 4 & 30 characters.");
  }
}

// Event listeners
// Generate password event
generatePassBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let char = "";
  if (upperCaseEl.checked) {
    char += "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
  }
  if (lowerCaseEl.checked) {
    char += "abcdefghijklmnopqrstuvwxyz";
  }
  if (numberEl.checked) {
    char += "0123456789";
  }
  if (symbolEl.checked) {
    char += "!@#$%^&*()_+=-/?<>,.:;[]{}|";
  }

  generatePass(char);
});

// Copy password to clipboard event
clipboardPassBtn.addEventListener("click", (e) => {
  if (resultEl.value.trim()) {
    e.preventDefault();
    resultEl.select();
    resultEl.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert(`Copied the password: ${resultEl.value}`);
  }
});
