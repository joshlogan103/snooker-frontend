// Cache create attendance form elements

const createAttendanceSubmitButton = document.getElementById('create-attendance-button')
const tournamentNameDropdown = document.getElementById('tournament-name-dropdown')
const pricePaid = document.getElementById('price-paid')
const dateAttended = document.getElementById('date-attended')
const showAttendancesButton = document.getElementById('get-all-attendances-button')
const attendanceDiv1 = document.getElementById('attendance-container-1')

// Initialize variables to cache user and to store user selection of tournament attended

let user
let tournamentAttended = ''

// Set event listeners

createAttendanceSubmitButton.addEventListener('click', createAttendance)
tournamentNameDropdown.addEventListener('click', loadTournamentNamesAttendance)
tournamentNameDropdown.addEventListener('change', storeTournamentIdAttendance)
showAttendancesButton.addEventListener('click', getAllAttendances)

// Functions

// Creates a new attendance in the database based on the html form

function createAttendance(e) {
  e.preventDefault()
  const newAttendance = {
    tournament: tournamentAttended,
    dateAttended: dateAttended.value,
    pricePaid: pricePaid.value
  }
  fetch(`${APIURL}/attendances`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAccessToken()}`},
    body: JSON.stringify(newAttendance) })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  pricePaid.value = ''
  dateAttended.value = ''
}

// Load player names into options for the playerId dropdown

function loadTournamentNamesAttendance() {
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
  this.removeEventListener('click', loadTournamentNamesAttendance)
}

// Caches the Id of the tournament attended for use in form submission

function storeTournamentIdAttendance(e) {
  const name = e.target.value
  fetch(`${APIURL}/tournaments/name/${name}`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(tournament => {
      tournamentAttended = tournament._id
    })
}

// Get all Attendances from API

function getAllAttendances() {
  attendanceDiv1.innerHTML = ''
  fetch(`${APIURL}/attendances`, {
    method: 'GET',
    headers:  {'Authorization': `Bearer ${getAccessToken()}`}
  })
    .then(res => res.json())
    .then(data => {
      if (!data.length > 0) return
      data.forEach(attendance => {
        const newAttendanceUl = document.createElement('ul')
        newAttendanceUl.classList.add('attendance-ul')
        Object.keys(attendance).forEach(key => {
          const fields = ['tournament', 'pricePaid', 'dateAttended']
          if (fields.includes(key)) {
            const newAttendanceLi = document.createElement('li')
            newAttendanceLi.classList.add('attendance-field-li')
            if (key === 'tournament') {
              newAttendanceLi.textContent = `${key}: ${attendance[key].name}`
            } else if (key === 'dateAttended') {
              newAttendanceLi.textContent = `${key}: ${attendance[key].split('T')[0]}`
            } else {
              newAttendanceLi.textContent = `${key}: ${attendance[key]}`
            }
            newAttendanceUl.appendChild(newAttendanceLi)
          }
        })
        attendanceDiv1.appendChild(newAttendanceUl)
      })
    })
}

