import request from 'supertest';
import app from '../app.js';
import knex from '../connection.js';
import movies from '../seeds/data/movies.js';
import ratings from '../seeds/data/ratings.js';

describe('ratings-related endpoints', () => {
  beforeAll(async () => {
    await knex('ratings').del();
    await knex('movies').insert(movies).onConflict('movie_id').ignore();
    await knex('ratings').insert(ratings);
    return knex.raw('ALTER SEQUENCE ratings_rating_id_seq RESTART WITH 3');
  });

  afterAll(async () => knex('ratings').del().where({ rating_id: 3 }));

  describe('GET /ratings', () => {
    it('should list all ratings', async () => {
      const response = await request(app).get('/ratings');

      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(ratings.length);
    });
  });

  describe('POST /ratings', () => {
    const newRating = {
      content: 'The movie is just ok.',
      movie_id: 3,
      score: 3,
    };

    it('should insert a rating', async () => {
      const response = await request(app).post('/ratings').send(newRating);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...newRating,
        rating_id: 3,
      });
    });

    it('should return 400 for rating without content', async () => {
      const newRatingWithoutContent = { ...newRating };
      delete newRatingWithoutContent.content;

      const response = await request(app).post('/ratings').send(newRatingWithoutContent);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"content" is required');
    });

    it('should return 400 for rating with empty content', async () => {
      const newRatingWithEmptyContent = { ...newRating };
      newRatingWithEmptyContent.content = '';

      const response = await request(app).post('/ratings').send(newRatingWithEmptyContent);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"content" is not allowed to be empty');
    });

    it('should return 400 for rating without score', async () => {
      const newRatingWithoutScore = { ...newRating };
      delete newRatingWithoutScore.score;

      const response = await request(app).post('/ratings').send(newRatingWithoutScore);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"score" is required');
    });

    it('should return 400 for rating with score < 1', async () => {
      const newRatingWithScoreZero = { ...newRating };
      newRatingWithScoreZero.score = 0;

      const response = await request(app).post('/ratings').send(newRatingWithScoreZero);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"score" must be greater than or equal to 1');
    });

    it('should return 400 for rating with score > 5', async () => {
      const newRatingWithScoreSix = { ...newRating };
      newRatingWithScoreSix.score = 6;

      const response = await request(app).post('/ratings').send(newRatingWithScoreSix);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"score" must be less than or equal to 5');
    });

    it('should return 400 for rating without movie_id', async () => {
      const newRatingWithoutMovieId = { ...newRating };
      delete newRatingWithoutMovieId.movie_id;

      const response = await request(app).post('/ratings').send(newRatingWithoutMovieId);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"movie_id" is required');
    });

    it('should return 404 when movie not exists', async () => {
      const newRatingWithWrongMovieId = { ...newRating };
      newRatingWithWrongMovieId.movie_id = 1000000;

      const response = await request(app).post('/ratings').send(newRatingWithWrongMovieId);

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('movie not found');
    });
  });
});
