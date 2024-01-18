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
