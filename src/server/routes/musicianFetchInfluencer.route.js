import { Router } from 'express';
import { validate } from 'express-validation';
import { MusicianFetchInfluencerController } from 'server/controllers';
import { musicianFetchInfluencerValidation, options } from 'server/validations';

const router = Router();

router.get('/:id', MusicianFetchInfluencerController.get);

export { router as musicianFetchInfluencerRouter };
