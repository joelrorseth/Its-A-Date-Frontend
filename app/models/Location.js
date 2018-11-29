export default class Location {
  formatted_address = "";
  name = "";
  place_id = "";
  rating = 0.0;

  constructor(formatted_address, name, place_id, rating) {
      this.formatted_address = formatted_address;
      this.name = name;
      this.place_id = place_id;
      this.rating = rating;
  }
}