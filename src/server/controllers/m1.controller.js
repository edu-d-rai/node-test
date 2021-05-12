import { CREATED } from 'http-status';
import { M1Service } from 'server/services';
import { NotFound } from 'utils/errors/NotFound';

class M1Controller {
  static async create(req, res, next) {
    try {
      const {
        m2s, 
      } = req.body;
      const newM1 = await M1Service
        .create(m2s, );
      res.locals.status = CREATED;
      res.locals.data = newM1;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async get(req, res, next) {
    try {
      const { id } = req.params;
      const m1 = await M1Service.get(id);
      if (!m1) {
        throw new NotFound(`M1 with primary key ${ id } not found`);
      }
      res.locals.data = m1;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async getAll(req, res, next) {
    try {
      const filters = { ...req.query };
      const allM1s = await M1Service.getAll(filters);
      res.locals.data = allM1s;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        m2s, 
      } = req.body;

      const updatedM1 = await M1Service.update(id, m2s, );

      res.locals.data = updatedM1;
      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params;
      const {
        m2s, 
      } = req.body;
      
      const updatedM1 = await M1Service.partialUpdate(id, m2s, );

      res.locals.data = updatedM1;
      return next();
    } catch (error) {
      return next(error);
    }
  }
  
  static async destroy(req, res, next) {
    try {
      const { id } = req.params;
      const m1Delete = await M1Service.destroy(id);
      res.locals.data = m1Delete;
      return next();
    } catch (error) {
      return next(error);
    }
  }
};

export { M1Controller };

