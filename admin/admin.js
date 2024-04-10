// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache necessary elements

const createPlayerSubmitButton = document.getElementById('create-player-button') 
const firstNamePlayerInput = document.getElementById('first-name-player')
const lastNamePlayerInput = document.getElementById('last-name-player')
const agePlayerInput = document.getElementById('age-player')
const nationalityPlayerInput = document.getElementById('nationality-player')
const worldRankingPlayerInput = document.getElementById('world-ranking-player')

// Add event listeners

createPlayerSubmitButton.addEventListener('click', createPlayer)

// Functions

// Create a player

function createPlayer(e) {
  e.preventDefault()
  const newPlayer = {
    firstName: firstNamePlayerInput.value,
    lastName: lastNamePlayerInput.value,
    age: agePlayerInput.value,
    nationality: nationalityPlayerInput.value,
    worldRanking: worldRankingPlayerInput.value
  }
  fetch(`${databaseURL}/players`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPlayer) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  firstNamePlayerInput.value = ''
  lastNamePlayerInput.value = ''
  agePlayerInput.value = ''
  nationalityPlayerInput.value = ''
  worldRankingPlayerInput.value = ''
}