const neo4j =  require('neo4j-driver');

const debug = require('debug')('omrs');


const initSession = (uri, user, password) => {
  const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
  const session = driver.session()
  return {driver, session};
}

const createMovie = (name, initialRating = 0) => ({
  name,
  rating: initialRating,
  numberOfRatings: 1,
});

const rateMovie = (profileUrl, movie, newRating) => ({
  ...movie,
  profileUrl,
  rating: ((movie.rating * movie.numberOfRatings) + newRating) / (movie.numberOfRatings + 1),
  numberOfRatings: movie.numberOfRatings + 1,
});

const addMovieRating = (profileUrl, movieTitle, rating) => ({

});

const getProfileId = (profileUri) => {
  return parseInt(profileUri.split("/").pop().split("?")[0]);
}
function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}
module.exports = {debug, getProfileId, isNumber,addMovieRating}