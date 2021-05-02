import express from 'express';
import MoviesController from '../controllers/moviesController.js';

const router = express.Router();

router.get('/movies', MoviesController.index);

export default router;
