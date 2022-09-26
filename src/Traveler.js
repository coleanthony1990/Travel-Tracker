class Traveler {
  constructor(details, tripData) {
    this.id = details.id
    this.name = details.name
    this.type = details.travelerType
    this.allUserTrips = tripData.trips.filter(trip => trip.userID === this.id)
  }
    
  getPendingTrips() {
    const userPendingTrips = this.allUserTrips.filter(trip => trip.status === 'pending')
    if (!userPendingTrips) {
      console.log('sorry, no pending trips')
    } else {
    return userPendingTrips
    }
  }
  
  getPastTrips() {
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/"); 
    const pastTrips = this.allUserTrips.filter((trip) => {
      if( trip.date < todayDate) {
        return trip
      }
    })
    if (!pastTrips) {
      console.log('sorry, no past Trips')
    } else
    return pastTrips
  }
  getFutureTrips() {
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    const futureTrips = this.allUserTrips.filter((trip) => {
      if( trip.date > todayDate) {
        return trip
      }
    })
    if (!futureTrips) {
      console.log('sorry, no future trips')
    } else {
    return futureTrips
  }
}
}


export default Traveler