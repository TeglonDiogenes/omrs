const neo4j =  require('neo4j-driver');
const dotenv = require('dotenv');

dotenv.config();

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
