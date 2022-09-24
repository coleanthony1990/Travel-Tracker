// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)

import fetchData from './api-calls.js';
import Traveler from './Traveler.js';


const tripCardsContainer = document.querySelector('#tripCardsContainer')

let currentUser;
let travelerData;
let tripData;
let destinationData;

function fetchAllData() {
  Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
  .then((data) => {
    travelerData = data[0],
    tripData = data[1],
    destinationData = data[2]
   
    currentUser = new Traveler(travelerData.travelers[Math.floor(Math.random() * travelerData.travelers.length)], tripData, destinationData)
    console.log(currentUser)

    loadUserTrips()
  })
}

//EventListeners
window.addEventListener('load', fetchAllData)



//functions
function loadUserTrips() {
currentUser.allUserTrips.forEach((trip)=> {
  tripCardsContainer.innerHTML += `<article class="trip-card">
  <img class="card-images" src="https://media.timeout.com/images/105211673/image.jpg" alt="roma" height="240px" width="350px">
  <p class="destination">destination: ${trip.destinationID}</p>
  <p class="date">date: ${trip.date}</p>
  <p class="duration">duration: ${trip.duration}</p>
  <p class="traveler-count">Travelers: ${trip.travelers}</p>
  <p class="trip-status">Status: ${trip.status}</p>
</article>`
})
}

