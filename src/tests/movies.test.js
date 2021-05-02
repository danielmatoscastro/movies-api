import request from 'supertest';
import app from '../app.js';
import movies from '../seeds/data/movies.js';

describe('movies-related endpoints', () => {
  describe('GET /movies', () => {
    it('should list all movies', async () => {
      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(movies.length);
    });
  });
});
