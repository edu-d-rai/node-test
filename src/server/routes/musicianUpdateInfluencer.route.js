import { Router } from 'express';
import { validate } from 'express-validation';
import { MusicianUpdateInfluencerController } from 'server/controllers';
import { musicianUpdateInfluencerValidation, options } from 'server/validations';

const router = Router();

router.put(
  '/:id',
  validate(musicianUpdateInfluencerValidation.update, options),
  MusicianUpdateInfluencerController.update
);

router.patch(
  '/:id',
  validate(musicianUpdateInfluencerValidation.partialUpdate, options),
  MusicianUpdateInfluencerController.partialUpdate
);

export { router as musicianUpdateInfluencerRouter };
