class Traveler {
  constructor(details) {
    this.id = details.id
    this.name = details.name
    this.type = details.travelerType
    this.allUserTrips = null
    this.pendingTrips = null
    this.approvedTrips = null
  }
  getUserTrips(tripData) {
    let userTrips = tripData.filter(trip => trip.userID === this.id)
    this.allUserTrips = userTrips
    return userTrips
    
  }
  getPendingTrips() {
    const userPendingTrips = this.allUserTrips.filter(trip => trip.status === 'pending')
    this.pendingTrips = userPendingTrips
    return userPendingTrips
  }
  getApprovedTrips() {
    const userApprovedTrips = this.allUserTrips.filter(trip => trip.status ==='approved')
    this.approvedTrips = userApprovedTrips
    return userApprovedTrips
  }
}


export default Traveler