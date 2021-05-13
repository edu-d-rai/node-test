import { Router } from 'express';
import { validate } from 'express-validation';
import { AlbumController } from 'server/controllers';
import { albumValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(albumValidation.getAll, options), AlbumController.getAll);

router.get('/:id', AlbumController.get);

router.post('/', validate(albumValidation.create, options), AlbumController.create);

router.put('/:id', validate(albumValidation.update, options), AlbumController.update);

router.patch(
  '/:id',
  validate(albumValidation.partialUpdate, options),
  AlbumController.partialUpdate
);

router.delete('/:id', validate(albumValidation.destroy, options), AlbumController.destroy);

export { router as albumApiRouter };
