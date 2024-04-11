// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache html elements

const usernameField = document.getElementById('username-signup')
const passwordField = document.getElementById('password-signup')
const signupButton = document.getElementById('signup-button')

// Set event listeners

signupButton.addEventListener('click', signup)

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
      console.log(data)
    })
  usernameField.value = ''
  passwordField.value = ''
}