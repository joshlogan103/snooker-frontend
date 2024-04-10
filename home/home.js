// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache html elements

const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv = document.getElementById('players-container')
const usernameField = document.getElementById('username-login')
const passwordField = document.getElementById('password-login')
const loginButton = document.getElementById('login-button')

// Set event listeners

showPlayersButton.addEventListener('click', getAllPlayers)
loginButton.addEventListener('click', signin)

// Functions

// Get all Players from API

function getAllPlayers() {
  playersDiv.innerHTML = '';
  fetch(`${databaseURL}/players`, {
    method: 'GET',
    credentials: 'include'
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

// Allow user signin

function signin(e) {
  e.preventDefault()
  const userData = {
    username: usernameField.value,
    password: passwordField.value
  }
  fetch(`${databaseURL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData) })
    .then(res => res.json())
    .then(data => console.log(data))
  usernameField.value = ''
  passwordField.value = ''
}
