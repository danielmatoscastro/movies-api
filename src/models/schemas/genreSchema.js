import Joi from 'joi';

const genreSchema = Joi.object({
  genre_id: Joi.number().integer().min(1),
  name: Joi.string().trim().min(1).required(),
});

export default genreSchema;
