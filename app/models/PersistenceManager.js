import axios from 'axios';

export default class PersistenceManager {

  static sharedInstance = null;
  host = 'http://localhost:3000/';


  // Lazy instantiation version of shared static variable accessor
  static getInstance() {
      if (PersistenceManager.sharedInstance == null)
          PersistenceManager.sharedInstance = new PersistenceManager();

      return this.sharedInstance;
  }


/**
 * Save a Date to the DB via the server
 * 
 * @param {Date} clientDateObj The object containing date info from user input.
 * @return {number} The Promise that has been executed (async).
 */
  async saveDate(clientDateObj) {
    const oldThis = this;

    // Create the Date object, and if response is OK, proceed to 
    // create and link DLEs and Locations
    return axios.post(this.host+'dates', {
      nameDate: clientDateObj.title,
      comments: clientDateObj.comment,
      city: clientDateObj.city,
      _id: clientDateObj.userId,
    }).then(response => {
      if (response.status == 200 || response.status == 201)
        return oldThis.saveLocations(response.data.createdDate, clientDateObj);
      else 
        throw new Error('Invalid Date');
    }).catch(error => { console.log("Error: SaveDate"); throw error; });
  }


/**
 * Save an array of Locations to the DB via the server
 * 
 * @param {object} serverDateObj The object containing date info returned from the server.
 * @param {Date} clientDateObj The object containing date info from user input.
 * @return {number} The Promise that has been executed (async).
 */
  async saveLocations(serverDateObj, clientDateObj) {
    var newDateID = serverDateObj._id;
    var createLocationsPromises = [];
    var serverLocations = [];
    const oldThis = this;
    
    // Collect all POST requests into an array of promises (executables)
    clientDateObj.dateLineEntries.forEach(dle => {
      createLocationsPromises.push(
        axios.post(this.host+'location', {
          place_id: dle.location.place_id,
          nameLocation: dle.location.name,
          address: dle.location.formatted_address,
          rating: dle.location.rating,
        })
      );
    });

    // Execute all promises synchronously
    return axios.all(createLocationsPromises)
      .then(results => {
        results.forEach(response => {
          serverLocations.push(response.data.location);
          if (response.status != 201 && response.status != 200)
            throw new Error('Invalid Location');
        });
        return oldThis.saveDateLineEntries(newDateID, serverLocations, clientDateObj);
      })
      .catch(error => { console.log("Error: SaveLocations"); throw error; })
  }

  
/**
 * Save a DateLineEntry to the DB via the server.
 * 
 * @param {object} serverDateID The id assigned to the new associated Date object, by the server.
 * @param {object} serverLocationsObj The object containing locations info returned from server.
 * @param {Date} clientDateObj The object containing date info from user input.
 * @return {number} The Promise that has been executed (async).
 */
  async saveDateLineEntries(serverDateID, serverLocationsObj, clientDateObj) {
    var createDLEPromises = [];
    console.log("DATEID: " + serverDateID);
    // Create DateLineEntry objects,
    serverLocationsObj.forEach((locationServerObj, i) => {
      createDLEPromises.push(
        axios.post(this.host+'dateLineEntry', {
          date: serverDateID,                      // a date id.
          location: locationServerObj._id,      // a location id. 
          name: locationServerObj.nameLocation,
          rating: clientDateObj.dateLineEntries[i].rating,
          comments: clientDateObj.dateLineEntries[i].comment,
        })
      );
    });

    // Execute the promises to create the DLE's
    return axios.all(createDLEPromises)
      .then(results => {
        results.forEach(response => {
          if (response.status != 201 && response.status != 200)
            throw new Error('Invalid DateLineEntry');
        });
      })
      .catch(error => { console.log("Error: SaveDateLineEntries"); throw error; })
  }
}