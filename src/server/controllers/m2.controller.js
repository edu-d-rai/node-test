import { CREATED } from 'http-status';
import { M2Service } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class M2Controller {
  static async create(req, res, next) {
    try {
      const {
        m1s, 
      } = req.body;
      const newM2 = await M2Service
        .create(m1s, );
      res.locals.status = CREATED;
      res.locals.data = newM2;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const m2 = await M2Service.get(id);
      if (!m2) {
        throw new NotFound(`M2 with primary key ${ id } not found`);
      }
      res.locals.data = m2;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allM2s = await M2Service.getAll(filters);
      res.locals.data = allM2s;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        m1s, 
      } = req.body;

      const updatedM2 = await M2Service.update(id, m1s, );

      res.locals.data = updatedM2;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        m1s, 
      } = req.body;
      
      const updatedM2 = await M2Service.partialUpdate(id, m1s, );

      res.locals.data = updatedM2;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const m2Delete = await M2Service.destroy(id);
      res.locals.data = m2Delete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
};

export { M2Controller };

