import { Router } from 'express';
import { validate } from 'express-validation';
import { ConcertController } from 'server/controllers';
import { concertValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(concertValidation.getAll, options), ConcertController.getAll);

router.get('/:name', ConcertController.get);

router.post('/', validate(concertValidation.create, options), ConcertController.create);

router.put('/:name', validate(concertValidation.update, options), ConcertController.update);

router.patch(
  '/:name',
  validate(concertValidation.partialUpdate, options),
  ConcertController.partialUpdate
);

router.delete('/:name', validate(concertValidation.destroy, options), ConcertController.destroy);

export { router as concertApiRouter };
