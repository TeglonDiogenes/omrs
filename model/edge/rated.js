// CREATE ()-[:RATED_MOVIE {rating :5}]->()
// CREATE CONSTRAINT constraint_rated_movie_edge FOR (movie:Movie) REQUIRE rated.rating IS UNIQUE AND (rated.rating >=1 AND rated.rating<=5)