import express from 'express';
import MoviesController from '../controllers/moviesController.js';

const router = express.Router();

router.get('/movies', MoviesController.index);
router.get('/movies/:id', MoviesController.show);
router.post('/movies', MoviesController.store);
router.put('/movies/:id', MoviesController.update);

export default router;
