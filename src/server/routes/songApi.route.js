import { Router } from 'express';
import { validate } from 'express-validation';
import { SongController } from 'server/controllers';
import { songValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(songValidation.getAll, options), SongController.getAll);

router.get('/:id', SongController.get);

router.post('/', validate(songValidation.create, options), SongController.create);

router.put('/:id', validate(songValidation.update, options), SongController.update);

router.patch('/:id', validate(songValidation.partialUpdate, options), SongController.partialUpdate);

router.delete('/:id', validate(songValidation.destroy, options), SongController.destroy);

export { router as songApiRouter };
