import request from 'supertest';
import app from '../app.js';
import knex from '../connection.js';
import movies from '../seeds/data/movies.js';
import ratings from '../seeds/data/ratings.js';

describe('ratings-related endpoints', () => {
  beforeAll(async () => {
    await knex('ratings').del();
    await knex('movies').insert(movies).onConflict('movie_id').ignore();
    return knex('ratings').insert(ratings);
  });

  describe('GET /ratings', () => {
    it('should list all ratings', async () => {
      const response = await request(app).get('/ratings');

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(ratings.length);
    });
  });
<<<<<<< HEAD
=======

  describe('POST /ratings', () => {
    it('should list all ratings', async () => {
      const response = await request(app).get('/ratings');

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(ratings.length);
    });
  });
>>>>>>> develop
});
