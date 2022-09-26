import './css/styles.css';
import { postData, promiseAll } from './api-calls.js';
import Traveler from './Traveler.js';

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

let currentUser;
let travelerData;
let tripData;
let destinationData;

//------Promises
promiseAll().then((responses) => {
  assignData(responses)
    currentUser = new Traveler(travelerData.travelers[Math.floor(Math.random() * travelerData.travelers.length)], tripData)
    loadUsername()
    loadPendingUserTrips()
    loadPastUserTrips()
    loadUpcomingUserTrips()
    loadYearsExpense()
    addDestinationOptions()
  })

function assignData(responses) {
    travelerData = responses[0]
    tripData = responses[1]
    destinationData = responses[2]
}

//EventListeners
window.addEventListener('load', promiseAll)
newTripButton.addEventListener('click', showNewTrip)

//functions
function loadUsername() {
  name.innerHTML += currentUser.name
}

function loadPendingUserTrips() {
currentUser.getPendingTrips().forEach((trip)=> {
  destinationData.destinations.forEach((destination) =>{
    if (destination.id === trip.destinationID) {
  pendingTripCards.innerHTML += `<h1>Pending Trips</h1>
  <article class="trip-card">
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
  const formData = new FormData(event.target)
  const formLocation = formData.get('destination')
  const locationID = destinationData.destinations.find((destination) => destination.destination === formLocation) 
  
  const newTripData = {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: locationID.id,
    travelers: parseInt(formData.get('travelerAmount')),
    date: formData.get('date'),
    duration: parseInt(formData.get('duration')),
    status: 'pending',
    suggestedActivities: []
  }
  if (!newTripData.date.includes('/')) {
    alert('Please enter date in the correct format')
  } else {
    postData(newTripData)
    .then(
      (data) => {
      assignData(data),
      currentUser.allUserTrips = tripData.trips.filter(trip => trip.userID === currentUser.id)
      pendingTripCards.innerHTML = ''
      yearsExpense.innerHTML =''
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

function showNewTrip() {
  console.log('hey')
  newTripPage.classList.remove('hidden')
  yourTripsPage.classList.add('hidden')
}
