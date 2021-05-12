import { M1Repository } from 'data/repositories';

class M1Service {
  static create(m2s, ) {
    return M1Repository.create(m2s, );
  }
  static get(id) {
    return M1Repository.get(id);
  }

  
  static getAll(args) {
    return M1Repository.getAll(args);
  }
  
  static update(id, m2s, ) {
    return M1Repository.update(id, m2s, );
  }

  static partialUpdate(id, m2s, ) {
    return M1Repository.partialUpdate({ id, m2s,  });
  }
  
  static destroy(id) {
    return M1Repository.destroy(id);
  }
}

export { M1Service };

