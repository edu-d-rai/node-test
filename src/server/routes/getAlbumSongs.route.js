import { Router } from 'express';
import { validate } from 'express-validation';
import { GetAlbumSongsController } from 'server/controllers';
import { getAlbumSongsValidation, options } from 'server/validations';

const router = Router();

router.get('/', validate(getAlbumSongsValidation.getAll, options), GetAlbumSongsController.getAll);

export { router as getAlbumSongsRouter };
