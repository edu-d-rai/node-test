import { M2Repository } from 'data/repositories';

class M2Service {
  static create(m1s, ) {
    return M2Repository.create(m1s, );
  }
  static get(id) {
    return M2Repository.get(id);
  }

  
  static getAll(args) {
    return M2Repository.getAll(args);
  }
  
  static update(id, m1s, ) {
    return M2Repository.update(id, m1s, );
  }

  static partialUpdate(id, m1s, ) {
    return M2Repository.partialUpdate({ id, m1s,  });
  }
  
  static destroy(id) {
    return M2Repository.destroy(id);
  }
}

export { M2Service };

