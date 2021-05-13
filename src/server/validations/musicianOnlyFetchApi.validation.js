import { Joi } from 'express-validation';
import { musicianInstrumentChoices } from 'server/utils/constants/fieldChoices';

const musicianOnlyFetchApiValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.string().uuid({ version: ['uuidv4'] }),
      firstName: Joi.string().max(70),
      lastName: Joi.string().max(40),
    }),
  },
};

export { musicianOnlyFetchApiValidation };
