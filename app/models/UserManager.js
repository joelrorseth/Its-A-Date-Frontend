import axios from 'axios';

export default class UserManager {

  static sharedInstance = null;

  host = 'http://localhost:3000/';
  _id = null;

  // Lazy instantiation version of shared static variable accessor
  static getInstance() {
    if (UserManager.sharedInstance == null)
      UserManager.sharedInstance = new UserManager();

    return this.sharedInstance;
  }

  // Determine if _id has been set for this shared instance
  userIDHasBeenSet() {
    return (this._id != null);
  }

  // Get the _id (will be from the shared instance)
  getUserID() {
    return this._id;
  }

  // Set the _id (will be from the shared instance)
  setUserID(id) {
    this._id = id;
  }

  // Delete the current user managed by this class
  deleteCurrentUser() {
    return axios.delete(this.host+'user/'+this._id)
      .then(response => {
        if (response.status != 200)
          throw new Error('Invalid deletion for userId');
        _id = null;
        UserManager.sharedInstance = null;
      })
      .catch(error => { console.log("Error: deleteCurrentUser") });
  }
}