// Cache html elements

const usernameField = document.getElementById('username-signup')
const passwordField = document.getElementById('password-signup')
const submitSignupButton = document.getElementById('submit-signup-button')

// Set event listeners

submitSignupButton.addEventListener('click', signup)

// Allow user signin

function signup(e) {
  e.preventDefault()
  const userData = {
    username: usernameField.value,
    password: passwordField.value
  }
  fetch(`${databaseURL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        window.location.href = '../login/login.html'
      }
    })
}






