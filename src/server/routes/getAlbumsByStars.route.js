import { Router } from 'express';
import { validate } from 'express-validation';
import { GetAlbumsByStarsController } from 'server/controllers';
import { getAlbumsByStarsValidation, options } from 'server/validations';

const router = Router();

router.get(
  '/',
  validate(getAlbumsByStarsValidation.getAll, options),
  GetAlbumsByStarsController.getAll
);

export { router as getAlbumsByStarsRouter };
