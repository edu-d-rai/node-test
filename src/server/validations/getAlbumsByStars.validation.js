import { Joi } from 'express-validation';
import { albumGenreChoices } from 'server/utils/constants/fieldChoices';

const getAlbumsByStarsValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.number().integer(),
      name: Joi.string().max(80),
    }),
  },
};

export { getAlbumsByStarsValidation };
