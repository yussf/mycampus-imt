class Resident {
  constructor(id, fname, lname, fb_id, pin) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.fb_id = fb_id;
    this.pin = pin;
  }
  // Getter
  get id() {
    return this.id;
  }
  get fname() {
    return this.fname;
  }
  get lname() {
    return this.lname;
  }
  get fb_id() {
    return this.fb_id;
  }
  // Method
  isPin(pin) {
    return this.pin == pin ;
  }
  
}
