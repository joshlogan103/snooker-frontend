// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache html elements

const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv = document.getElementById('players-container')
const loginButton = document.getElementById('login-button')
const signupButton = document.getElementById('signup-button')
const logoutButton = document.getElementById('logout-button')
const adminViewButton = document.getElementById('admin-view-button')

// Set event listeners

showPlayersButton.addEventListener('click', getAllPlayers)
adminViewButton.addEventListener('click', accessAdminPortal)
loginButton.addEventListener('click', () => window.location.href = './login/login.html')
signupButton.addEventListener('click', () => window.location.href = './signup/signup.html')
logoutButton.addEventListener('click', logout)

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
        }
      })
  }
})

// Functions

// Get all Players from API

function getAllPlayers() {
  playersDiv.innerHTML = '';
  fetch(`${databaseURL}/players`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(data => {
      if (!data.length > 0) return
      data.forEach(player => {
        const newPlayerUl = document.createElement('ul')
        newPlayerUl.classList.add('player-ul')
        Object.keys(player).forEach(key => {
          const newPlayerFieldLi = document.createElement('li')
          newPlayerFieldLi.classList.add('player-field-li')
          if (key === 'tournamentsPlayed') {
            player[key].join(', ')
          }
          newPlayerFieldLi.textContent = `${key}: ${player[key]}`
          newPlayerUl.appendChild(newPlayerFieldLi)
        })
        playersDiv.appendChild(newPlayerUl)
      })
    })
}

function accessAdminPortal() {
  window.location.href='./admin/admin.html'
}

function logout() {
  localStorage.removeItem('jwtToken')
  window.location.reload()
}