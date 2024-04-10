// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache html elements

const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv = document.getElementById('players-container')

// Set event listeners

showPlayersButton.addEventListener('click', getAllPlayers)

// Functions

// Get all Players from API

function getAllPlayers() {
  playersDiv.innerHTML = '';
  fetch(`${databaseURL}/players`)
    .then(res =>  res.json())
    .then(data => {
      console.log(data)
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