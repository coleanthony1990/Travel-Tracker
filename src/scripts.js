import './css/styles.css';
import { postData, promiseAll } from './api-calls.js';
import Traveler from './Traveler.js';
import dayjs from 'dayjs';

const pendingTripCards = document.querySelector('#pendingTripCardsContainer')
const yearsExpense = document.querySelector('#expenses')
const name = document.querySelector('#nameOfUser')
const addDestinations = document.querySelector('#newTripDestination')
const newTripDate = document.getElementById('newTripDate')
const newTripDuration = document.getElementById('newTripDuration')
const travelerCount = document.getElementById('travelerNumber')
const submitNewTrip = document.getElementById('submitNewTrip')
const newTripForm = document.getElementById('newTripForm')
const tripEstimate = document.getElementById('estimateValue')
const pastTripCards = document.getElementById('pastTripCardsContainer')
const upcomingTripCards = document.getElementById('UpcomingTripCardsContainer')
const newTripButton = document.getElementById('newTripButton')
const newTripPage = document.querySelector('#newTrip')
const yourTripsPage = document.querySelector('.your-trips')
const yourTripsButton = document.querySelector('#yourTripButton')
const navBar = document.querySelector('.nav-bar');
const loginPage = document.querySelector('.login-page');
const loginForm = document.querySelector('.login-form');
const loginUsername = document.querySelector('#usernameInput');
const loginPassword = document.querySelector('#passwordInput');
const loginError = document.querySelector('.error');
const loginButton = document.querySelector('.login-button')

let currentUser;
let travelerData;
let tripData;
let destinationData;

//EventListeners
window.addEventListener('load', promiseAll)
newTripButton.addEventListener('click', showNewTrip)
yourTripsButton.addEventListener('click', showYourTrips)
loginForm.addEventListener('submit', checkLogin)

//---------login------//
function checkLogin(event) {
  event.preventDefault();
  let username = loginUsername.value;
  let password = loginPassword.value;
  let usernameID = username.split(/(\d+)/);

  if(usernameID[0] === 'traveler' && usernameID[1] > 0 && usernameID[1] < 51 && password === 'travel') {
    loginPage.classList.add('hidden');
    navBar.classList.remove('hidden');
    yourTripsPage.classList.remove('hidden')
    loadUserPage(usernameID[1])
  } else {
    loginError.innerHTML = `Oops, try again!`
  }
}

//------Promises/loadPage--------//
function loadUserPage(id) {
  promiseAll().then((responses) => {
    assignData(responses)
    const singleTraveler = travelerData.travelers.find((traveler) => {
      return traveler.id === parseInt(id)
    })
      currentUser = new Traveler(singleTraveler, tripData)
      loadUsername()
      loadPendingUserTrips()
      loadPastUserTrips()
      loadUpcomingUserTrips()
      loadYearsExpense()
      addDestinationOptions()
    })
  }

function assignData(responses) {
    travelerData = responses[0]
    tripData = responses[1]
    destinationData = responses[2]
}

//------functions------
function loadUsername() {
  name.innerHTML += currentUser.name
}

function showNewTrip() {
  console.log('hey')
  newTripPage.classList.remove('hidden')
  yourTripsPage.classList.add('hidden')
}

function showYourTrips() {
  newTripPage.classList.add('hidden')
  yourTripsPage.classList.remove('hidden')
}

function loadPendingUserTrips() {

  pendingTripCards.innerHTML = `<h1>PendingTrips</h1>`
  currentUser.getPendingTrips().forEach((trip)=> {
    destinationData.destinations.forEach((destination) =>{
      if (destination.id === trip.destinationID) {
    pendingTripCards.innerHTML += `<article class="trip-card">
    <img class="card-images" src=${destination.image} alt=${destination.alt} height="240px" width="350px">
    <p class="destination">destination: ${destination.destination}</p>
    <p class="date">date: ${trip.date}</p>
    <p class="duration">duration: ${trip.duration}</p>
    <p class="traveler-count">Travelers: ${trip.travelers}</p>
    <p class="trip-status">Status: ${trip.status}</p>
  </article>`
  } 
  })
})
}

function loadPastUserTrips() {
  currentUser.getPastTrips().forEach((trip)=> {
    destinationData.destinations.forEach((destination) =>{
      if (destination.id === trip.destinationID && trip.status === 'approved') {
    pastTripCards.innerHTML += `<article class="trip-card">
    <img class="card-images" src=${destination.image} alt=${destination.alt} height="240px" width="350px">
    <p class="destination">destination: ${destination.destination}</p>
    <p class="date">date: ${trip.date}</p>
    <p class="duration">duration: ${trip.duration}</p>
    <p class="traveler-count">Travelers: ${trip.travelers}</p>
    <p class="trip-status">Status: ${trip.status}</p>
  </article>`
      }
  })
  })
  }

  function loadUpcomingUserTrips() {
    currentUser.getFutureTrips().forEach((trip)=> {
      destinationData.destinations.forEach((destination) =>{
        if (destination.id === trip.destinationID && trip.status === 'approved' ) {
      upcomingTripCards.innerHTML += `<article class="trip-card">
      <img class="card-images" src=${destination.image} alt=${destination.alt} height="240px" width="350px">
      <p class="destination">destination: ${destination.destination}</p>
      <p class="date">date: ${trip.date}</p>
      <p class="duration">duration: ${trip.duration}</p>
      <p class="traveler-count">Travelers: ${trip.travelers}</p>
      <p class="trip-status">Status: ${trip.status}</p>
    </article>`
        }
    })
    })
    }

function loadYearsExpense() {
  let sum = 0
  currentUser.allUserTrips.forEach((trip) => {
    destinationData.destinations.forEach((destination) => {
      if (destination.id === trip.destinationID && trip.date.includes(new Date().getFullYear())) {
        const equation = (destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers)
         sum += (equation * .10) + equation
      }
    })
  })
  yearsExpense.innerHTML += `Total expenses this year: $${sum}`
}

function addDestinationOptions() {
  destinationData.destinations.forEach((destination) => {
  addDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
})
}

/////posting and getting new data------------

newTripForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const dateValue = dayjs(newTripDate.value).format().slice(0, 10).split('-').join('/');
  const locationID = destinationData.destinations.find((destination) => destination.destination === addDestinations.value) 
  const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/"); 
  
  const newTripData = {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: locationID.id,
    travelers: parseInt(travelerCount.value),
    date: dateValue,
    duration: parseInt(newTripDuration.value),
    status: 'pending',
    suggestedActivities: []
  }
  if (dateValue > todayDate) {
    alert('Please choose a date in the future')
  } else {
    postData(newTripData)
    .then(
      (data) => {
      assignData(data),
      currentUser.allUserTrips = tripData.trips.filter(trip => trip.userID === currentUser.id)
      pendingTripCards.innerHTML = ''
      yearsExpense.innerHTML = ''
      loadPendingUserTrips()
      loadYearsExpense()
      })
    event.target.reset()
  }
})

newTripForm.addEventListener('change', () => {
  let sum = 0
  destinationData.destinations.forEach((destination) => {
    if (destination.destination === addDestinations.value) {
      const equation = (destination.estimatedLodgingCostPerDay * newTripDuration.value) + (destination.estimatedFlightCostPerPerson * travelerCount.value)
      sum += (equation * .10) + equation
    }
  })
  tripEstimate.innerHTML = `This trip's estimate is: $${sum}`
})