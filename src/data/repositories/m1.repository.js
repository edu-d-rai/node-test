import { M1 } from 'data/models';
import { NotFound } from 'server/utils/errors';

class M1Repository {
  static async create(m2s, ) {
    const createdM1 = await M1.create({
      
    });

    if (m2s) await createdM1.setM2s(m2s);
    
    return createdM1;
  }
  static get(id) {
    return M1.findByPk(id,{ include: ['m2s'] });
  }

  static getAll(filters) {
    return M1.findAll({
      where: filters,
      include: ['m2s'],
    });
  }

  static async update(id, m2s, ) {
    return this.partialUpdate({
      id, m2s, 
    });
  }

  static async partialUpdate({ id, m2s,  }) {
    const foundM1 = await M1.findByPk(id);
    if (!foundM1) throw new NotFound(`M1 with primary key ${ id } not found`);
    if (m2s !== undefined) await foundM1.setM2s(m2s);
    await foundM1.save();
    return foundM1.reload();
  }



  static async destroy(id) {
    const foundM1 = await M1.findByPk(id);
    if (!foundM1) throw new NotFound(`M1 with primary key ${ id } not found`);
    await foundM1.destroy();
    return foundM1;
  }

}

export { M1Repository };

