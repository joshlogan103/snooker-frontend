// Cache necessary elements

const mainEl = document.querySelector('main')

// Create player form elements

const createPlayerSubmitButton = document.getElementById('create-player-button') 
const firstNamePlayerInput = document.getElementById('first-name-player')
const lastNamePlayerInput = document.getElementById('last-name-player')
const agePlayerInput = document.getElementById('age-player')
const nationalityPlayerInput = document.getElementById('nationality-player')
const worldRankingPlayerInput = document.getElementById('world-ranking-player')
// Add update element caches here

// Create tournament form elements

const createTournamentSubmitButton = document.getElementById('create-tournament-button') 
const nameTournament = document.getElementById('name-tournament')
const prizeMoneyTournament = document.getElementById('prize-money-tournament')
const startDateTournament = document.getElementById('start-date-tournament')
const endDateTournament = document.getElementById('end-date-tournament')
const countryTournament = document.getElementById('country-tournament')
const cityTournament = document.getElementById('city-tournament')
const venueNameTournament = document.getElementById('venue-name-tournament')
const positionsTournamanet = document.getElementById('leaderboard-positions-tournament')
const prizeBreakdownTournament = document.getElementById('prize-breakdown-tournament')

// Protect this page to only logged in admins

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    window.location.href='../login/login.html'
  } else {
    fetch(`${databaseURL}/auth/validateAdmin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`},
      body: '' })
      .then(res => res.json())
      .then(data => {
        if (data !== true) {
          window.location.href='../login/login.html'
        } else {
          mainEl.style.display = 'block'
        }
      })
  }
})

// Add event listeners

createPlayerSubmitButton.addEventListener('click', createPlayer)
createTournamentSubmitButton.addEventListener('click', createTournament)

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

function createTournament(e) {
  e.preventDefault()
  const positions = positionsTournamanet.value.split(', ')
  const prizeBreakdown = prizeBreakdownTournament.value.split(', ')
  const newTournament = {
    name: nameTournament.value,
    prizeMoney: prizeMoneyTournament.value,
    startDate: startDateTournament.value,
    endDate: endDateTournament.value,
    location: {
      country: countryTournament.value,
      city: cityTournament.value,
      venueName: venueNameTournament.value
    },
    leaderboard: {
      positions: positions,
      prizeMoneyBreakdown: prizeBreakdown
    }
  }
  fetch(`${databaseURL}/tournaments`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
    body: JSON.stringify(newTournament) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  nameTournament.value = ''
  prizeMoneyTournament.value = ''
  startDateTournament.value = ''
  endDateTournament.value = ''
  countryTournament.value = ''
  cityTournament.value = ''
  venueNameTournament.value = ''
  positionsTournamanet.value = ''
  prizeBreakdownTournament.value = ''
}
