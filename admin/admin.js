// API URL cache

const databaseURL = 'http://localhost:3005'

// Cache necessary elements

const mainEl = document.querySelector('main')
const createPlayerSubmitButton = document.getElementById('create-player-button') 
const firstNamePlayerInput = document.getElementById('first-name-player')
const lastNamePlayerInput = document.getElementById('last-name-player')
const agePlayerInput = document.getElementById('age-player')
const nationalityPlayerInput = document.getElementById('nationality-player')
const worldRankingPlayerInput = document.getElementById('world-ranking-player')

// Protect this page to only logged in admins

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    window.location.href='../signin/signin.html'
  } else {
    fetch(`${databaseURL}/auth/validateAdmin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`},
      body: '' })
      .then(res => res.json())
      .then(data => {
        if (data !== true) {
          window.location.href='../signin/signin.html'
        } else {
          mainEl.style.display = 'block'
        }
      })
  }
})

// Add event listeners

createPlayerSubmitButton.addEventListener('click', createPlayer)

// Retrieve JWT token from local storage

function getAccessToken() {
  return localStorage.getItem('jwtToken')
}

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
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
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