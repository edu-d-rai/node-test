import Sequelize from 'sequelize';
import config from 'config';

import { albumModel } from './album.model';
import { concertModel } from './concert.model';
import { musicianModel } from './musician.model';
import { songModel } from './song.model';

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
});

musicianModel(sequelize);
albumModel(sequelize);
songModel(sequelize);
concertModel(sequelize);

const { Musician, Album, Song, Concert } = sequelize.models;

Musician.associate(sequelize.models);
Album.associate(sequelize.models);
Song.associate(sequelize.models);
Concert.associate(sequelize.models);

if (process.env.NODE_ENV !== 'test' && !process.env.USE_MIGRATIONS) {
  sequelize.sync({ alter: true });
}

export { sequelize, Musician, Album, Song, Concert };
