import { Router } from 'express';
import { validate } from 'express-validation';
import { M2Controller } from 'server/controllers';
import { m2Validation, options } from 'server/validations';

const router = Router();

router.get('/', validate(m2Validation.getAll, options), M2Controller.getAll);

router.get('/:id', M2Controller.get);

router.post('/', validate(m2Validation.create, options), M2Controller.create);

router.put('/:id', validate(m2Validation.update, options), M2Controller.update);

router.patch('/:id', validate(m2Validation.partialUpdate, options), M2Controller.partialUpdate);

router.delete('/:id', validate(m2Validation.destroy, options), M2Controller.destroy);

export { router as m2Router };

