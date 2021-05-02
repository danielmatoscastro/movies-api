import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env' : '.test.env',
});

const app = express();

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'ok' }));

app.use(errorHandler);

export default app;
