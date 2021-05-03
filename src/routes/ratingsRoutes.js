import express from 'express';
import RatingsController from '../controllers/ratingsController.js';

const router = express.Router();

router.get('/ratings', RatingsController.index);

export default router;
