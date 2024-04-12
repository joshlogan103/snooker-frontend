// API URL cache

const databaseURL = 'http://localhost:3005'
//const databaseURL = 'https://maximum-break-api-943feb008688.herokuapp.com'

// Cache html elements

const loginButton = document.getElementById('login-button')
const signupButton = document.getElementById('signup-button')
const logoutButton = document.getElementById('logout-button')
const adminViewButton = document.getElementById('admin-view-button')

// Add event listeners

loginButton.addEventListener('click', goToLogin)
signupButton.addEventListener('click', goToSignup)
logoutButton.addEventListener('click', logout)
adminViewButton.addEventListener('click', accessAdminPortal)


// Retrieve JWT token from local storage

function getAccessToken() {
  return localStorage.getItem('jwtToken')
}

// Check if a user is logged in

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    loginButton.style.display = 'block'
    signupButton.style.display = 'block'
  } else {
    fetch(`${databaseURL}/auth/verifyLoggedIn`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`},
      body: '' })
      .then(res => res.json())
      .then(data => {
        if (data !== true) {
          loginButton.style.display = 'block'
          signupButton.style.display = 'block'
        } else {
          logoutButton.style.display = 'block'
          adminViewButton.style.display = 'block'
        }
      })
  }
})

function goToLogin() {
  window.location.href = '../login/login.html'
}

function goToSignup() {
  window.location.href = '../signup/signup.html'
}

function logout() {
  localStorage.removeItem('jwtToken')
  window.location.href = '../index.html'
}

function accessAdminPortal() {
  window.location.href='./admin/admin.html'
}