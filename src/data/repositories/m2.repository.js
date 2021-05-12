import { M2 } from 'data/models';
import { NotFound } from 'server/utils/errors';

class M2Repository {
  static async create(m1s, ) {
    const createdM2 = await M2.create({
      
    });

    if (m1s) await createdM2.setM1s(m1s);
    
    return createdM2;
  }
  static get(id) {
    return M2.findByPk(id,{ include: ['m1s'] });
  }

  static getAll(filters) {
    return M2.findAll({
      where: filters,
      include: ['m1s'],
    });
  }

  static async update(id, m1s, ) {
    return this.partialUpdate({
      id, m1s, 
    });
  }

  static async partialUpdate({ id, m1s,  }) {
    const foundM2 = await M2.findByPk(id);
    if (!foundM2) throw new NotFound(`M2 with primary key ${ id } not found`);
    if (m1s !== undefined) await foundM2.setM1s(m1s);
    await foundM2.save();
    return foundM2.reload();
  }



  static async destroy(id) {
    const foundM2 = await M2.findByPk(id);
    if (!foundM2) throw new NotFound(`M2 with primary key ${ id } not found`);
    await foundM2.destroy();
    return foundM2;
  }

}

export { M2Repository };

