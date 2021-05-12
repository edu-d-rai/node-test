import { Joi } from 'express-validation';

const m1Validation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
    }),
  },
  create: {
    body: Joi.object({
      m2s: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  update: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      m2s: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
    body: Joi.object({
      m2s: Joi.array().items(Joi.number().integer()).default([]),
    }),
  },
  destroy: {
    params: Joi.object({
      id: Joi.number().integer().required(),
    }),
  },
};

export { m1Validation };

