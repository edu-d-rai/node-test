import { Joi } from 'express-validation';
import { musicianInstrumentChoices } from 'server/utils/constants/fieldChoices';

const musicianFetchAllValidation = {
  getAll: {
    query: Joi.object({
      id: Joi.string().uuid({ version: ['uuidv4'] }),
      firstName: Joi.string().max(70),
      lastName: Joi.string().max(40),
      instrument: Joi.string().valid(...musicianInstrumentChoices),
      age: Joi.number().integer().min(0),
      fans: Joi.number().integer().min(0),
      inspiredAt: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/),
    }),
  },
};

export { musicianFetchAllValidation };
