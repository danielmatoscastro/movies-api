import movies from '../../seeds/data/movies.js';
import actors from '../../seeds/data/actors.js';
import actorsMovies from '../../seeds/data/actorsMovies.js';
import genre from '../../seeds/data/genre.js';
import genreMovies from '../../seeds/data/genreMovies.js';
import ratings from '../../seeds/data/ratings.js';

export default (id) => {
  const movie = movies.find((m) => m.movie_id === id);

  const actorsIds = actorsMovies
    .filter((ac) => ac.movie_id === id)
    .map((ac) => ac.actor_id);

  const actorsInMovie = actors
    .filter((actor) => actorsIds.includes(actor.actor_id))
    .map((ac) => ac.name);

  const genreIds = genreMovies
    .filter((ge) => ge.movie_id === id)
    .map((ge) => ge.genre_id);

  const genreOfMovie = genre
    .filter((ge) => genreIds.includes(ge.genre_id))
    .map((ge) => ge.name);

  const ratingsOfMovie = ratings
    .filter((rating) => rating.movie_id === id)
    // eslint-disable-next-line camelcase
    .map((rating) => rating.rating_id);

  return {
    ...movie,
    actors: actorsInMovie,
    genre: genreOfMovie,
    ratings_ids: ratingsOfMovie,
  };
};
