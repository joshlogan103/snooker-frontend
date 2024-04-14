// Cache html elements

const playerNameInput = document.getElementById('attendance-name-input')
const submitPlayerSearchButton = document.getElementById('submit-attendance-search-button')
const searchedPlayerContainer = document.getElementById('searched-attendance-container')
const showPlayersButton = document.getElementById('get-all-attendances-button')

// Set event listeners

submitPlayerSearchButton.addEventListener('click', findPlayer)
showPlayersButton.addEventListener('click', getAllPlayers)

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
  fetch(`${APIURL}/players/name/${playerNameValue}`)
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

// Get all Attendances from API

function getAllPlayers() {
  playersDiv1.innerHTML = ''
  fetch(`${APIURL}/attendances`, {
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
        playersDiv1.appendChild(newPlayerUl)
      })
    })
}

