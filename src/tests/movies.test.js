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

    it('should return 404 when movie not exists', async () => {
      const id = 10000000;

      const response = await request(app).get(`/movies/${id}`);

      expect(response.status).toBe(404);
    });
  });

  describe('POST /movies', () => {
    const newMovie = {
      title: 'Avengers: Age of Ultron',
      year: '2015',
      runtime: '141 min',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      actors: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo', 'Chris Evans'],
      plot: "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
    };

    it('should insert a movie', async () => {
      const response = await request(app).post('/movies').send(newMovie);

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...newMovie,
        movie_id: 4,
        ratings_ids: [],
      });
    });

    it('should return 400 for movie without title', async () => {
      const newMovieWithoutTitle = { ...newMovie };
      delete newMovieWithoutTitle.title;

      const response = await request(app).post('/movies').send(newMovieWithoutTitle);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"title" is required');
    });

    it('should return 400 for movie without year', async () => {
      const newMovieWithoutYear = { ...newMovie };
      delete newMovieWithoutYear.year;

      const response = await request(app).post('/movies').send(newMovieWithoutYear);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"year" is required');
    });

    it('should return 400 for movie with non-numeric year', async () => {
      const newMovieWithWrongYear = { ...newMovie, year: 'year' };

      const response = await request(app).post('/movies').send(newMovieWithWrongYear);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"year" with value "year" fails to match the year pattern');
    });

    it('should return 400 for movie without runtime', async () => {
      const newMovieWithoutRuntime = { ...newMovie };
      delete newMovieWithoutRuntime.runtime;

      const response = await request(app).post('/movies').send(newMovieWithoutRuntime);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"runtime" is required');
    });

    it('should return 400 for movie with wrong runtime', async () => {
      const newMovieWithWrongRuntime = { ...newMovie, runtime: '120 minutes' };

      const response = await request(app).post('/movies').send(newMovieWithWrongRuntime);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"runtime" with value "120 minutes" fails to match the runtime pattern');
    });

    it('should return 400 for movie without plot', async () => {
      const newMovieWithoutPlot = { ...newMovie };
      delete newMovieWithoutPlot.plot;

      const response = await request(app).post('/movies').send(newMovieWithoutPlot);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"plot" is required');
    });

    it('should return 400 for movie with empty plot', async () => {
      const newMovieWithEmptyPlot = { ...newMovie, plot: '' };

      const response = await request(app).post('/movies').send(newMovieWithEmptyPlot);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"plot" is not allowed to be empty');
    });

    it('should return 400 for movie without genre', async () => {
      const newMovieWithoutGenre = { ...newMovie };
      delete newMovieWithoutGenre.genre;

      const response = await request(app).post('/movies').send(newMovieWithoutGenre);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"genre" is required');
    });

    it('should return 400 for movie without actors', async () => {
      const newMovieWithoutActors = { ...newMovie };
      delete newMovieWithoutActors.actors;

      const response = await request(app).post('/movies').send(newMovieWithoutActors);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('"actors" is required');
    });

    it('should return 409 when movie already exists', async () => {
      await request(app).post('/movies').send(newMovie);

      const response = await request(app).post('/movies').send(newMovie);

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('movie already exists');
    });
  });
});
