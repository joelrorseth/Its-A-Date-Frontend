export default class UserManager {

  static sharedInstance = null;

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
}