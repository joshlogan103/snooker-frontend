// API URL cache

const databaseURL = 'https://maximum-break-api-943feb008688.herokuapp.com'

// Cache html elements

const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv = document.getElementById('players-container')
const adminViewButton = document.getElementById('admin-view-button')

// Set event listeners

showPlayersButton.addEventListener('click', getAllPlayers)
adminViewButton.addEventListener('click', accessAdminPortal)


// Retrieve JWT token from local storage

function getAccessToken() {
  return localStorage.getItem('jwtToken')
}

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
