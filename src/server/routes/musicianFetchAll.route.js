import { Router } from 'express';
import { validate } from 'express-validation';
import { MusicianFetchAllController } from 'server/controllers';
import { musicianFetchAllValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(musicianFetchAllValidation.getAll, options),
  MusicianFetchAllController.getAll
);

router.get('/:id', MusicianFetchAllController.get);

export { router as musicianFetchAllRouter };
