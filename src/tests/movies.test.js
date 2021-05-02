import request from 'supertest';
import app from '../app.js';
import movies from '../seeds/data/movies.js';
import getMovieData from './utils/getMovieData.js';

describe('movies-related endpoints', () => {
  describe('GET /movies', () => {
    it('should list all movies', async () => {
      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(movies.length);
    });
  });

  describe('GET /movies/:id', () => {
    let expectedMovie;
    beforeAll(() => {
      const id = 3;
      expectedMovie = getMovieData(id);
    });

    it('should find a movie by id', async () => {
      const response = await request(app).get(`/movies/${expectedMovie.movie_id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedMovie);
    });
  });
});
