import { Router } from 'express';
import { validate } from 'express-validation';
import { M1Controller } from 'server/controllers';
import { m1Validation, options } from 'server/validations';

const router = Router();

router.get('/', validate(m1Validation.getAll, options), M1Controller.getAll);

router.get('/:id', M1Controller.get);

router.post('/', validate(m1Validation.create, options), M1Controller.create);

router.put('/:id', validate(m1Validation.update, options), M1Controller.update);

router.patch('/:id', validate(m1Validation.partialUpdate, options), M1Controller.partialUpdate);

router.delete('/:id', validate(m1Validation.destroy, options), M1Controller.destroy);

export { router as m1Router };

