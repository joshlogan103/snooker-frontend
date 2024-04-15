// Cache necessary elements

const mainEl = document.querySelector('main')

// Create player form elements

const createPlayerSubmitButton = document.getElementById('create-player-button') 
const firstNamePlayerInput = document.getElementById('first-name-player')
const lastNamePlayerInput = document.getElementById('last-name-player')
const agePlayerInput = document.getElementById('age-player')
const nationalityPlayerInput = document.getElementById('nationality-player')
const worldRankingPlayerInput = document.getElementById('world-ranking-player')

// Create tournament form elements

const createTournamentSubmitButton = document.getElementById('create-tournament-button') 
const nameTournamentInput = document.getElementById('name-tournament')
const prizeMoneyTournamentInput = document.getElementById('prize-money-tournament')
const startDateTournamentInput = document.getElementById('start-date-tournament')
const endDateTournamentInput = document.getElementById('end-date-tournament')
const countryTournamentInput = document.getElementById('country-tournament')
const cityTournamentInput = document.getElementById('city-tournament')
const venueNameTournamentInput = document.getElementById('venue-name-tournament')
const positionsTournamentInput = document.getElementById('leaderboard-positions-tournament')
const prizeBreakdownTournamentInput = document.getElementById('prize-breakdown-tournament')

// Update player form elements

const updatePlayerSubmitButton = document.getElementById('update-player-button')
const updatePlayerFullNameDropdown = document.getElementById('update-player-fullName-dropdown')
const idPlayerUpdateInput = document.getElementById('id-player-update')
const firstNamePlayerUpdateInput = document.getElementById('first-name-player-update')
const lastNamePlayerUpdateInput = document.getElementById('last-name-player-update')
const agePlayerUpdateInput = document.getElementById('age-player-update')
const nationalityPlayerUpdateInput = document.getElementById('nationality-player-update')
const worldRankingPlayerUpdateInput = document.getElementById('world-ranking-player-update')

// Update tournament form elements

const updateTournamentSubmitButton = document.getElementById('update-tournament-button') 
const updateTournamentNameDropdown = document.getElementById('update-tournament-name-dropdown')
const idTournamentUpdateInput = document.getElementById('id-tournament-update')
const nameTournamentUpdateInput = document.getElementById('name-tournament-update')
const prizeMoneyTournamentUpdateInput = document.getElementById('prize-money-tournament-update')
const startDateTournamentUpdateInput = document.getElementById('start-date-tournament-update')
const endDateTournamentUpdateInput = document.getElementById('end-date-tournament-update')
const countryTournamentUpdateInput = document.getElementById('country-tournament-update')
const cityTournamentUpdateInput = document.getElementById('city-tournament-update')
const venueNameTournamentUpdateInput = document.getElementById('venue-name-tournament-update')
const positionsTournamentUpdateInput = document.getElementById('leaderboard-positions-tournament-update')
const prizeBreakdownTournamentUpdateInput = document.getElementById('prize-breakdown-tournament-update')

// Delete player form elements

const deletePlayerSubmitButton = document.getElementById('delete-player-button')
const deletePlayerFullNameDropdown = document.getElementById('delete-player-fullName-dropdown')
const idPlayerDeleteInput = document.getElementById('id-player-delete')

// Delete tournament form elements

const deleteTournamentSubmitButton = document.getElementById('delete-tournament-button')
const deleteTournamentNameDropdown = document.getElementById('delete-tournament-name-dropdown')
const idTournamentDeleteInput = document.getElementById('id-tournament-delete')

// Protect this page to only logged in admins

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = getAccessToken()
  if (!accessToken) {
    window.location.href='../login/login.html'
  } else {
    fetch(`${APIURL}/auth/validateAdmin`, {
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
updatePlayerSubmitButton.addEventListener('click', updatePlayer)
updateTournamentSubmitButton.addEventListener('click', updateTournament)
deletePlayerSubmitButton.addEventListener('click', deletePlayer)
deleteTournamentSubmitButton.addEventListener('click', deleteTournament)

updatePlayerFullNameDropdown.addEventListener('click', loadPlayerNames)
updatePlayerFullNameDropdown.addEventListener('change', populateUpdatePlayerDetails)
deletePlayerFullNameDropdown.addEventListener('click', loadPlayerNames)
deletePlayerFullNameDropdown.addEventListener('change', populateDeletePlayerId)
updateTournamentNameDropdown.addEventListener('click', loadTournamentNames)
updateTournamentNameDropdown.addEventListener('change', populateUpdateTournamentDetails)
deleteTournamentNameDropdown.addEventListener('click', loadTournamentNames)
deleteTournamentNameDropdown.addEventListener('change', populateDeleteTournamentId)

// Functions

// Creates a new player in the database based on the html form

function createPlayer(e) {
  e.preventDefault()
  const newPlayer = {
    firstName: firstNamePlayerInput.value,
    lastName: lastNamePlayerInput.value,
    age: agePlayerInput.value,
    nationality: nationalityPlayerInput.value,
    worldRanking: worldRankingPlayerInput.value
  }
  fetch(`${APIURL}/players`,{
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

// Creates a new tournament in the database based on the html form

function createTournament(e) {
  e.preventDefault()
  const positions = positionsTournamentInput.value.split(', ')
  const prizeBreakdown = prizeBreakdownTournamentInput.value.split(', ')
  const newTournament = {
    name: nameTournamentInput.value,
    prizeMoney: prizeMoneyTournamentInput.value,
    startDate: startDateTournamentInput.value,
    endDate: endDateTournamentInput.value,
    location: {
      country: countryTournamentInput.value,
      city: cityTournamentInput.value,
      venueName: venueNameTournamentInput.value
    },
    leaderboard: {
      positions: positions,
      prizeMoneyBreakdown: prizeBreakdown
    }
  }
  fetch(`${APIURL}/tournaments`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
    body: JSON.stringify(newTournament) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  nameTournamentInput.value = ''
  prizeMoneyTournamentInput.value = ''
  startDateTournamentInput.value = ''
  endDateTournamentInput.value = ''
  countryTournamentInput.value = ''
  cityTournamentInput.value = ''
  venueNameTournamentInput.value = ''
  positionsTournamentInput.value = ''
  prizeBreakdownTournamentInput.value = ''
}

// Updates an existing player in the database based on the html form

function updatePlayer(e) {
  e.preventDefault()
  const playerId = idPlayerUpdateInput.value
  const updatedPlayer = {}
  if (firstNamePlayerUpdateInput.value) {updatedPlayer.firstName = firstNamePlayerUpdateInput.value}
  if (lastNamePlayerUpdateInput.value) {updatedPlayer.lastName = lastNamePlayerUpdateInput.value}
  if (agePlayerUpdateInput.value) {updatedPlayer.age = agePlayerUpdateInput.value}
  if (nationalityPlayerUpdateInput.value) {updatedPlayer.nationality = nationalityPlayerUpdateInput.value}
  if (worldRankingPlayerUpdateInput.value) {updatedPlayer.worldRanking = worldRankingPlayerUpdateInput.value}
  fetch(`${APIURL}/players/${playerId}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
    body: JSON.stringify(updatedPlayer) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  idPlayerUpdateInput.value = ''
  firstNamePlayerUpdateInput.value = ''
  lastNamePlayerUpdateInput.value = ''
  agePlayerUpdateInput.value = ''
  nationalityPlayerUpdateInput.value = ''
  worldRankingPlayerUpdateInput.value = ''
}

// Creates a new tournament in the database based on the html form

function updateTournament(e) {
  e.preventDefault()
  const tournamentId = idTournamentUpdateInput.value
  const positions = positionsTournamentUpdateInput.value.split(', ')
  const prizeBreakdown = prizeBreakdownTournamentUpdateInput.value.split(', ').map(prize => parseFloat(prize))
  const updatedTournament = {}
  const location = {}
  const leaderboard = {}

  if (nameTournamentUpdateInput.value) {updatedTournament.name = nameTournamentUpdateInput.value}
  if (prizeMoneyTournamentUpdateInput.value) {updatedTournament.prizeMoney = parseFloat(prizeMoneyTournamentUpdateInput.value)}
  if (startDateTournamentUpdateInput.value) {updatedTournament.startDate = new Date(startDateTournamentUpdateInput.value)}
  if (endDateTournamentUpdateInput.value) {updatedTournament.endDate = new Date(endDateTournamentUpdateInput.value)}
  if (countryTournamentUpdateInput.value) {location.country = countryTournamentUpdateInput.value}
  if (cityTournamentUpdateInput.value) {location.city = cityTournamentUpdateInput.value}
  if (venueNameTournamentUpdateInput.value) {location.venueName = venueNameTournamentUpdateInput.value}
  if (positionsTournamentUpdateInput.value) {leaderboard.positions = positions}
  if (prizeBreakdownTournamentUpdateInput.value) {leaderboard.prizeMoneyBreakdown = prizeBreakdown}

  if (Object.keys(location).length !== 0) {updatedTournament.location = location}
  if (Object.keys(leaderboard).length !== 0) {updatedTournament.leaderboard = leaderboard}

  console.log(location)
  console.log(leaderboard)
  console.log(updatedTournament)

  fetch(`${APIURL}/tournaments/${tournamentId}`,{
    method: 'PUT',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
    body: JSON.stringify(updatedTournament) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  idTournamentUpdateInput.value = ''
  nameTournamentUpdateInput.value = ''
  prizeMoneyTournamentUpdateInput.value = ''
  startDateTournamentUpdateInput.value = ''
  endDateTournamentUpdateInput.value = ''
  countryTournamentUpdateInput.value = ''
  cityTournamentUpdateInput.value = ''
  venueNameTournamentUpdateInput.value = ''
  positionsTournamentUpdateInput.value = ''
  prizeBreakdownTournamentUpdateInput.value = ''
}

// Delete a player in the databse by entering the player ID

function deletePlayer(e) {
  e.preventDefault()
  const playerId = idPlayerDeleteInput.value
  fetch(`${APIURL}/players/${playerId}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  idPlayerDeleteInput.value = ''
}

// Delete a tournament in the databse by entering the tournament ID

function deleteTournament(e) {
  e.preventDefault()
  const tournamentId = idTournamentDeleteInput.value
  fetch(`${APIURL}/tournaments/${tournamentId}`,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  idTournamentDeleteInput.value = ''
}

// Load player names into options for the playerId dropdown

function loadPlayerNames() {
  fetch(`${APIURL}/players`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(data => {
      if (!data.length > 0) return
      data.forEach(player => {
        const newOption = document.createElement('option')
        newOption.classList.add('player-name-option')
        newOption.value = player.fullName
        newOption.textContent = player.fullName
        this.appendChild(newOption)
      })
    })
  this.removeEventListener('click', loadPlayerNames)
}

// Populate player details into update player form fields

function populateUpdatePlayerDetails(e) {
  const fullName = e.target.value
  fetch(`${APIURL}/players/name/${fullName}`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(player => {
      idPlayerUpdateInput.value = ''
      firstNamePlayerUpdateInput.value = ''
      lastNamePlayerUpdateInput.value = ''
      agePlayerUpdateInput.value = ''
      nationalityPlayerUpdateInput.value = ''
      worldRankingPlayerUpdateInput.value = ''
      idPlayerUpdateInput.value = player._id
      firstNamePlayerUpdateInput.value = player.firstName
      lastNamePlayerUpdateInput.value = player.lastName
      agePlayerUpdateInput.value = player.age
      nationalityPlayerUpdateInput.value = player.nationality
      worldRankingPlayerUpdateInput.value = player.worldRanking
    })
}

// Populate player ID into delete player form field

function populateDeletePlayerId(e) {
  const fullName = e.target.value
  fetch(`${APIURL}/players/name/${fullName}`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(player => {
      idPlayerDeleteInput.value = ''
      idPlayerDeleteInput.value = player._id
    })
}

// Load player names into options for the playerId dropdown

function loadTournamentNames() {
  fetch(`${APIURL}/tournaments`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(data => {
      if (!data.length > 0) return
      data.forEach(tournament => {
        const newOption = document.createElement('option')
        newOption.classList.add('tournament-name-option')
        newOption.value = tournament.name
        newOption.textContent = tournament.name
        this.appendChild(newOption)
      })
    })
  this.removeEventListener('click', loadTournamentNames)
}

// Populate Tournament details into update tournament form fields

function populateUpdateTournamentDetails(e) {
  const name = e.target.value
  fetch(`${APIURL}/tournaments/name/${name}`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(tournament => {
      idTournamentUpdateInput.value = ''
      nameTournamentUpdateInput.value = ''
      prizeMoneyTournamentUpdateInput.value = ''
      startDateTournamentUpdateInput.value = ''
      endDateTournamentUpdateInput.value = ''
      countryTournamentUpdateInput.value = ''
      cityTournamentUpdateInput.value = ''
      venueNameTournamentUpdateInput.value = ''
      positionsTournamentUpdateInput.value = ''
      prizeBreakdownTournamentUpdateInput.value = ''
      idTournamentUpdateInput.value = tournament._id
      nameTournamentUpdateInput.value = tournament.name
      prizeMoneyTournamentUpdateInput.value = tournament.prizeMoney
      startDateTournamentUpdateInput.value = tournament.startDate
      endDateTournamentUpdateInput.value = tournament.endDate
      countryTournamentUpdateInput.value = tournament.location.country
      cityTournamentUpdateInput.value = tournament.location.city
      venueNameTournamentUpdateInput.value = tournament.location.venueName
      positionsTournamentUpdateInput.value = tournament.leaderboard.positions
      prizeBreakdownTournamentUpdateInput.value = tournament.leaderboard.prizeMoneyBreakdown
    })
}

// Populate tournament ID into delete tournament form field

function populateDeleteTournamentId(e) {
  const name = e.target.value
  fetch(`${APIURL}/tournaments/name/${name}`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(tournament => {
      idTournamentDeleteInput.value = ''
      idTournamentDeleteInput.value = tournament._id
    })
}