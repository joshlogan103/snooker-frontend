// Cache html elements

const playerNameInput = document.getElementById('player-name-input')
const submitPlayerSearchButton = document.getElementById('submit-player-search-button')
const searchedPlayerContainer = document.getElementById('searched-player-container')
const playerTournamentsContainer = document.getElementById('player-tournaments-container')
const playerPerformancesContainer = document.getElementById('player-performances-container')
const tournamentsTitle = document.getElementById('tournaments-title')
const showPlayersButton = document.getElementById('get-all-players-button')
const playersDiv1 = document.getElementById('players-container-1')

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
  playerTournamentsContainer.innerHTML = ''
  let playerNameValue = playerNameInput.value
  playerNameValue = playerNameValue.replace(/\s/g,'_') // Replace spaces with underscores in name
  let playerId = '';
  fetch(`${APIURL}/players/name/${playerNameValue}`)
    .then(res => res.json())
    .then(player => {
      if (player.error) return
      playerId = player._id
      const newPlayerUl = document.createElement('ul')
      newPlayerUl.classList.add('searched-player-ul')
      Object.keys(player).forEach(key => {
        const fields = ['fullName', 'age', 'nationality', 'worldRanking', 'lifetimeEarnings']
        if (fields.includes(key)) {
          if (key === 'fullName') {
            newPlayerUl.prepend(`${player[key]}`)
          } else {
            const newPlayerFieldLi = document.createElement('li')
            newPlayerFieldLi.classList.add('player-field-li')
            newPlayerFieldLi.textContent = `${key}: ${player[key]}`
            newPlayerUl.appendChild(newPlayerFieldLi)
          }
        }
      })
      tournamentsTitle.textContent = "Tournaments Results"
      searchedPlayerContainer.appendChild(newPlayerUl)
    })
    .then(() => {
      getSearchedPlayerPerformances(playerId)
    })
}

// Get all performances for the searched player

function getSearchedPlayerPerformances(playerId) {
  fetch(`${APIURL}/performances/player/${playerId}`)
    .then(res => res.json())
    .then(performances => {
      console.log(performances)
      const performanceFields = ['tournamentId', 'position', 'prizeEarned']
      performances.forEach(performance => {
        const newPerformanceUl = document.createElement('ul')
        newPerformanceUl.classList.add('performance-ul')
        Object.entries(performance).forEach(([key, value]) => {
          if (performanceFields.includes(key)) {
            const newPerformanceFieldLi = document.createElement('li')
            newPerformanceFieldLi.classList.add('player-field-li')
            if (key === 'tournamentId') {
              newPerformanceFieldLi.textContent = `tournament: ${value.name}`
            } else {
              newPerformanceFieldLi.textContent = `${key}: ${value}`
            }
            newPerformanceUl.appendChild(newPerformanceFieldLi)
          }
        })
        playerPerformancesContainer.appendChild(newPerformanceUl)
      })
    })
}

// Get all Players from API

function getAllPlayers() {
  playersDiv1.innerHTML = ''
  fetch(`${APIURL}/players`, {
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
          const fields = ['fullName', 'age', 'nationality', 'worldRanking', 'lifetimeEarnings']
          if (fields.includes(key)) {
            if (key === 'fullName') {
              newPlayerUl.prepend(`${player[key]}`)
            } else {
              const newPlayerFieldLi = document.createElement('li')
              newPlayerFieldLi.classList.add('player-field-li')
              newPlayerFieldLi.textContent = `${key}: ${player[key]}`
              newPlayerUl.appendChild(newPlayerFieldLi)
            }
          }
        })
        playersDiv1.appendChild(newPlayerUl)
      })
    })
}


// else if (key === 'tournamentsPlayed') {
//   const playerTournamentFields = ['name', 'startDate', 'endDate', 'prizeMoney']
//   player[key].forEach(playerTournament => {
//     const newPlayerTournamentUl = document.createElement('ul')
//     newPlayerTournamentUl.classList.add('player-field-li')
//     Object.entries(playerTournament).forEach(([tournamentKey, tournamentValue]) => {
//       if (playerTournamentFields.includes(tournamentKey)) {
//         const newPlayerTournamentLi = document.createElement('li')
//         newPlayerTournamentLi.classList.add('player-field-li')
//         newPlayerTournamentLi.textContent = `${tournamentKey}: ${tournamentValue}`
//         newPlayerTournamentUl.appendChild(newPlayerTournamentLi)
//       }
//     })
//     playerTournamentsContainer.appendChild(newPlayerTournamentUl)
//   })