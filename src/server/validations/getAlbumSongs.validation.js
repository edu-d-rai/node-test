import { Joi } from 'express-validation';

const getAlbumSongsValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().max(100),
      lyrics: Joi.string().max(1000),
      code: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
};

export { getAlbumSongsValidation };
