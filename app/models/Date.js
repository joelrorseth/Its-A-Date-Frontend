export default class Date {
  title = "";
  comment = "";
  city = "";
  dateLineEntries = [];
  userId = null;

  constructor(title, comment, city, dateLineEntries, userId) {
    this.title = title;
    this.comment = comment;
    this.city = city;
    this.dateLineEntries = dateLineEntries;
    this.userId = userId;
  }
}