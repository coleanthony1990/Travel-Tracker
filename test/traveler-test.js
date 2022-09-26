import { expect } from 'chai';
import Traveler from '../src/Traveler.js';
import tripData from '../sample-data/trip-sample.js';
import travelers from '../sample-data/traveler-sample.js'


describe('Traveler', () => {
  let travelersData, traveler1, traveler2, traveler3, traveler4;
  let traveler1Data, traveler2Data, traveler3Data, traveler4Data;

  beforeEach(() => {
    traveler1Data = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    }
    traveler2Data = {
      id: 2,
      name: "Rachael Vaughten",
      travelerType: "thrill-seeker"
    }
    traveler3Data = {
      id: 3,
      name: "Sibby Dawidowitsch",
      travelerType: "shopper"
    }
    traveler4Data = {
      id: 24,
      name: "Rex Littleproud",
      travelerType: "foodie"
    }
    travelersData = new Traveler(travelers, tripData)
    traveler1 = new Traveler(traveler1Data, tripData)
    traveler2 = new Traveler(traveler2Data, tripData)
    traveler3 = new Traveler(traveler3Data, tripData)
    traveler4 = new Traveler(traveler4Data, tripData)
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  })
  it('should have an id', () => {
    expect(traveler1.id).to.equal(1)
    expect(traveler2.id).to.equal(2)
    expect(traveler3.id).to.equal(3)
  })
  it('should have a name', () => {
    expect(traveler1.name).to.equal("Ham Leadbeater")
    expect(traveler2.name).to.equal("Rachael Vaughten")
    expect(traveler3.name).to.equal("Sibby Dawidowitsch")
  })
  it('should have a travelerType', () => {
    expect(traveler1.type).to.equal("relaxer")
    expect(traveler2.type).to.equal("thrill-seeker")
    expect(traveler3.type).to.equal("shopper")
  })
  it('should be able to get trip data for user', () => {
    expect(traveler1.allUserTrips).to.deep.equal([
      {
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: '2021/01/09',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      }])
  })
  it('should be able to get pending trips', () => {
    expect(traveler2.getPendingTrips()).to.deep.equal([
      {
        id: 171,
        userID: 2,
        destinationID: 43,
        travelers: 1,
        date: '2020/12/27',
        duration: 18,
        status: 'pending',
        suggestedActivities: []
      }
    ])
    expect(traveler1.getPendingTrips()).to.equal('sorry, no pending trips')
  })
  it('should be able to get past trips', () => {
    expect(traveler1.getPastTrips()).to.deep.equal([
      {
        id: 117,
        userID: 1,
        destinationID: 28,
        travelers: 3,
        date: '2021/01/09',
        duration: 15,
        status: 'approved',
        suggestedActivities: []
      }
    ])
  })
  it('should be able to get future trips', () => {
    expect(traveler4.getFutureTrips()).to.deep.equal([
      {
        id: 9,
        userID: 24,
        destinationID: 19,
        travelers: 5,
        date: '2022/12/19',
        duration: 19,
        status: 'approved',
        suggestedActivities: []
      }
    ])
  })
  

})