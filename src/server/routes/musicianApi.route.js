import { Router } from 'express';
import { validate } from 'express-validation';
import { MusicianController } from 'server/controllers';
import { musicianValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(musicianValidation.getAll, options), MusicianController.getAll);

router.get('/:id', MusicianController.get);

router.post('/', validate(musicianValidation.create, options), MusicianController.create);

router.put('/:id', validate(musicianValidation.update, options), MusicianController.update);

router.patch(
  '/:id',
  validate(musicianValidation.partialUpdate, options),
  MusicianController.partialUpdate
);

router.delete('/:id', validate(musicianValidation.destroy, options), MusicianController.destroy);

export { router as musicianApiRouter };
