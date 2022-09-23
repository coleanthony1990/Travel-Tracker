import { expect } from 'chai';
import travelers from '../sample-data/traveler-sample.js';
import Traveler from '../src/Traveler.js';
import tripData from '../sample-data/trip-sample.js'


describe('Traveler', () => {
  let traveler, traveler1, traveler2, traveler3
  let traveler1Data, traveler2Data, traveler3Data

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
    traveler = new Traveler(travelers)
    traveler1 = new Traveler(traveler1Data)
    traveler2 = new Traveler(traveler2Data)
    traveler3 = new Traveler(traveler3Data)
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
    expect(traveler1.getUserTrips(tripData)).to.deep.equal([
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
    traveler2.getUserTrips(tripData)

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
  })
  it ('should be able to get approved trips', () => {
    traveler1.getUserTrips(tripData)
    expect(traveler1.getApprovedTrips()).to.deep.equal([
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

})