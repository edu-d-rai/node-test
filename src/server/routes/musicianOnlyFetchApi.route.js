import { Router } from 'express';
import { validate } from 'express-validation';
import { MusicianOnlyFetchApiController } from 'server/controllers';
import { musicianOnlyFetchApiValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(musicianOnlyFetchApiValidation.getAll, options),
  MusicianOnlyFetchApiController.getAll
);

router.get('/:id', MusicianOnlyFetchApiController.get);

export { router as musicianOnlyFetchApiRouter };
