// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import { fetchData, postData, promiseAll } from './api-calls.js';
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
const newTripPage = document.querySelector('.hidden')
const yourTripsPage = document.querySelector('.your-trips')



let currentUser;
let travelerData;
let tripData;
let destinationData;

promiseAll().then((responses) => {
  assignData(responses)
    currentUser = new Traveler(travelerData.travelers[Math.floor(Math.random() * travelerData.travelers.length)], tripData)
    console.log('1', currentUser)
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
currentUser.allUserTrips.forEach((trip)=> {
  destinationData.destinations.forEach((destination) =>{
    if (destination.id === trip.destinationID && trip.status === 'pending') {
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
  const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
  currentUser.allUserTrips.forEach((trip)=> {
    destinationData.destinations.forEach((destination) =>{
      if (destination.id === trip.destinationID && trip.date < todayDate && trip.status === 'approved') {
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
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    currentUser.allUserTrips.forEach((trip)=> {
      destinationData.destinations.forEach((destination) =>{
        if (destination.id === trip.destinationID && trip.date > todayDate ) {
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
  yearsExpense.innerHTML += `$${sum}`
}

function addDestinationOptions() {
  destinationData.destinations.forEach((destination) => {

  
  addDestinations.innerHTML += `<option value="${destination.destination}">${destination.destination}</option>`
})
}

newTripForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formLocation = formData.get('destination')
  const locationID = destinationData.destinations.find((destination) => destination.destination === formLocation) 
  
  const newTripData = {
    id: Date.now(),
    userID: currentUser.id,
    destinationID: locationID.id,
    travelers: formData.get('travelerAmount'),
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
      loadPendingUserTrips()
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
