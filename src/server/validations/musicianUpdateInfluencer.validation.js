import { Joi } from 'express-validation';
import { musicianInstrumentChoices } from 'server/utils/constants/fieldChoices';

const musicianUpdateInfluencerValidation = {
  update: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      influencer: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
  partialUpdate: {
    params: Joi.object({
      id: Joi.string()
        .uuid({ version: ['uuidv4'] })
        .required(),
    }),
    body: Joi.object({
      influencer: Joi.string().uuid({ version: ['uuidv4'] }),
    }),
  },
};

export { musicianUpdateInfluencerValidation };
