import Joi from 'joi';

const movieSchema = Joi.object({
  movie_id: Joi.number().integer().min(1),
  title: Joi.string().trim().min(1).required(),
  year: Joi.string().trim().pattern(/^[0-9]{4}$/, 'year').required(),
  runtime: Joi.string().trim().pattern(/^[0-9]+ min$/, 'runtime').required(),
  genre: Joi.array().items(Joi.string().trim().min(1)).required(),
  actors: Joi.array().items(Joi.string().trim().min(1)).required(),
  plot: Joi.string().trim().min(1).required(),
  ratings_ids: Joi.array().items(Joi.number().integer().min(1)),
});

export default movieSchema;
