import Joi from 'joi';

const actorSchema = Joi.object({
  actor_id: Joi.number().integer().min(1),
  name: Joi.string().trim().min(1).required(),
});

export default actorSchema;
