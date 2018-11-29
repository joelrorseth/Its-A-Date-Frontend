export default class DateLineEntry {
  location = null;
  comment = "";
  rating = 0.0;

  constructor(location, comment, rating) {
    this.location = location;
    this.comment = comment;
    this.rating = rating;
  }
}