class Traveler {
  constructor(details, tripData) {
    this.id = details.id
    this.name = details.name
    this.type = details.travelerType
    this.allUserTrips = tripData.filter(trip => trip.userID === this.id)
  }
    
  getPendingTrips() {
    const userPendingTrips = this.allUserTrips.filter(trip => trip.status === 'pending')
    return userPendingTrips
  }
  getApprovedTrips() {
    const userApprovedTrips = this.allUserTrips.filter(trip => trip.status ==='approved')
    return userApprovedTrips
  }
  
  getPastTrips() {
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    
    const pastTrips = this.allUserTrips.filter((trip) => {
    
      if( trip.date < todayDate) {

        return trip
      }
    })

    return pastTrips
  }
  getFutureTrips() {
    
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    
    const futureTrips = this.allUserTrips.filter((trip) => {
      console.log(trip.date, todayDate)
      if( trip.date > todayDate) {
        return trip
      }
    })
    console.log(futureTrips)
    return futureTrips
  }
}


export default Traveler