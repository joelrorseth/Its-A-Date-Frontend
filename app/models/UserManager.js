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

/**
 * Create account with given credentials.
 * 
 * @param {object} email The user specified email address
 * @param {object} userName The user specified username
 * @param {object} password The user specified password
 * @return {number} The Promise that has been executed (async).
 */
  async createUser(email, userName, password) {
    return axios.post(this.host+'user/createAccount', {
        email: email,
        userName: userName,
        password: password
      })
      .then(response => {
        if (response.status != 201 && response.data.message != "User created")
          throw new Error('Invalid info for new account');
      })
      .catch(error => { console.log("Error: createUser"); throw error; });
  }

/**
 * Log into an existing user account with given credentials.
 * 
 * @param {object} email The user specified email address
 * @param {object} password The user specified password
 * @return {number} The Promise that has been executed (async).
 */
  async logInUser(email, password) {
    const oldThis = this;

    return axios.post(this.host+'user/login', {
        email: email,
        password: password
      })
      .then(response => {
        if (response.status != 200 && response.data.message != "Auth successful")
          throw new Error('Invalid login credentials');
        else
          oldThis._id = response.data._id;
      })
      .catch(error => { console.log("Error: logInUser"); throw error; })
  }

/**
 * Delete the current user managed by this class (already logged in).
 * 
 * @return {number} The Promise that has been executed (async).
 */
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