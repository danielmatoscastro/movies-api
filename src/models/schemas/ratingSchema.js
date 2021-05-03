import Joi from 'joi';

const ratingSchema = Joi.object({
  movie_id: Joi.number().integer().min(1).required(),
  content: Joi.string().trim().min(1).required(),
  score: Joi.number().integer().min(1).max(5)
    .required(),
});

export default ratingSchema;
