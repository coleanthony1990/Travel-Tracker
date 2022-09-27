import dayjs from 'dayjs'

class Traveler {
  constructor(details, tripData) {
    this.id = details.id
    this.name = details.name
    this.type = details.travelerType
    this.allUserTrips = tripData.trips.filter(trip => trip.userID === this.id)
  }
    
  getPendingTrips() {
    const userPendingTrips = this.allUserTrips.filter(trip => trip.status === 'pending')
    return userPendingTrips
    
  }
  
  getPastTrips() {
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/"); 
    const pastTrips = this.allUserTrips.filter((trip) => {
      const formattedDate = dayjs(trip.date).format('YYYY/MM/DD')
      if( formattedDate < todayDate) {
        return trip
      }
    })
    return pastTrips
  }
  getFutureTrips() {
    const todayDate = new Date().toISOString().slice(0, 10).split("-").join("/");
    const futureTrips = this.allUserTrips.filter((trip) => {
      const formattedDate = dayjs(trip.date).format('YYYY/MM/DD')
      if( formattedDate > todayDate) {
        return trip
      }
    })
    return futureTrips
  }
}


export default Traveler