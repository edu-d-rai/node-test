import Sequelize from 'sequelize';
import config from 'config';

import { m1Model } from './m1.model';
import { m2Model } from './m2.model';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
});

m1Model(sequelize);
m2Model(sequelize);

const { M1,M2, } = sequelize.models;

M1.associate(sequelize.models);
M2.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { 
  sequelize,
  M1,
  M2,
};
