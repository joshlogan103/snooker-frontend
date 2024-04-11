// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache html elements

const usernameField = document.getElementById('username-login')
const passwordField = document.getElementById('password-login')
const loginButton = document.getElementById('login-button')

// Set event listeners

loginButton.addEventListener('click', login)

// Allow user login

function login(e) {
  e.preventDefault()
  const userData = {
    username: usernameField.value,
    password: passwordField.value
  }
  fetch(`${databaseURL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) })
    .then(res => res.json())
    .then(data => {
      if (data.accessToken) {
        const accessToken = data.accessToken 
        localStorage.setItem('jwtToken', accessToken)
        window.location.href = '../index.html'
      }
    })
}