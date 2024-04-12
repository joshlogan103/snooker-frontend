// Cache html elements

const playerNameInput = document.getElementById('player-name-input')
const submitPlayerSearchButton = document.getElementById('submit-player-search-button')
const searchedPlayerContainer = document.getElementById('searched-player-container')
const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv1 = document.getElementById('players-container-1')
const playersDiv2 = document.getElementById('players-container-2')
const playersDiv3 = document.getElementById('players-container-3')
const adminViewButton = document.getElementById('admin-view-button')

// Set event listeners

submitPlayerSearchButton.addEventListener('click', findPlayer)
showPlayersButton.addEventListener('click', getAllPlayers)
adminViewButton.addEventListener('click', accessAdminPortal)

// Retrieve JWT token from local storage

function getAccessToken() {
  return localStorage.getItem('jwtToken')
}

// Functions

// Get a player by name from API

function findPlayer(e) {
  e.preventDefault()
  searchedPlayerContainer.innerHTML = ''
  let playerNameValue = playerNameInput.value
  playerNameValue = playerNameValue.replace(/\s/g,'_') // Replace spaces with underscores in name
  fetch(`${databaseURL}/players/name/${playerNameValue}`)
    .then(res => res.json())
    .then(player => {
      const newPlayerUl = document.createElement('ul')
      newPlayerUl.classList.add('searched-player-ul')
      Object.keys(player).forEach(key => {
        const fields = ['fullName', 'age', 'nationality', 'worldRanking', 'lifetimeEarnings']
        if (fields.includes(key)) {
          const newPlayerFieldLi = document.createElement('li')
          newPlayerFieldLi.classList.add('player-field-li')
          newPlayerFieldLi.textContent = `${key}: ${player[key]}`
          newPlayerUl.appendChild(newPlayerFieldLi)
        }
      })
      searchedPlayerContainer.appendChild(newPlayerUl)
    })
}

// Get all Players from API

function getAllPlayers() {
  playersDiv1.innerHTML = ''
  fetch(`${databaseURL}/players`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(data => {
      if (!data.length > 0) return
      data.forEach(player => {
        const columnCount = 3
        const newPlayerUl = document.createElement('ul')
        newPlayerUl.classList.add('player-ul')
        Object.keys(player).forEach(key => {
          const fields = ['fullName', 'age', 'nationality', 'worldRanking', 'lifetimeEarnings']
          if (fields.includes(key)) {
            const newPlayerFieldLi = document.createElement('li')
            newPlayerFieldLi.classList.add('player-field-li')
            newPlayerFieldLi.textContent = `${key}: ${player[key]}`
            newPlayerUl.appendChild(newPlayerFieldLi)
          }
        })
        if(data.indexOf(player) % columnCount === 0) {
          playersDiv1.appendChild(newPlayerUl)
        } else if (data.indexOf(player) % columnCount === 1) {
          playersDiv2.appendChild(newPlayerUl)
        } else {
          playersDiv3.appendChild(newPlayerUl)
        }
      })
    })
}

function accessAdminPortal() {
  window.location.href='./admin/admin.html'
}

