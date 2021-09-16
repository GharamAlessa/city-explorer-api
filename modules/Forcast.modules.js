class Forecast {
    constructor(date, low, high, desc) {
      this.date = date;
      this.description = `Low of ${low}, high of ${high} with ${desc} `;
    }
  }
  module.exports =Forecast;