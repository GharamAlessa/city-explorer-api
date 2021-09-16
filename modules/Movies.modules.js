class Movies {
    constructor(title, overViwe, avgVotes, total, img, date, pop) {
      this.title = title;
      this.overView = overViwe;
      this.avgVotes = avgVotes;
      this.total = total;
      this.img = `https://image.tmdb.org/t/p/w500${img}`;
      this.date = date;
      this.pop = pop;
    }
  }
 module.exports =Movies;