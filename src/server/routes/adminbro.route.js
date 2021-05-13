import { musicianInstrumentChoices, albumGenreChoices } from 'server/utils/constants/fieldChoices';
import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
    {
      resource: sequelize.models.Musician,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'firstName', 'lastName', 'instrument', 'age', 'fans', 'inspiredAt'],
        properties: {
          instrument: {
            availableValues: musicianInstrumentChoices.map((instrument) => ({
              value: instrument,
              label: instrument.toUpperCase(),
            })),
          },
        },
      },
    },
    {
      resource: sequelize.models.Album,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'name', 'genre', 'releaseDate', 'numStars', 'ranking', 'upc'],
        properties: {
          genre: {
            availableValues: albumGenreChoices.map((genre) => ({
              value: genre,
              label: genre.toUpperCase(),
            })),
          },
        },
      },
    },
    {
      resource: sequelize.models.Song,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['id', 'name', 'lyrics', 'code'],
      },
    },
    {
      resource: sequelize.models.Concert,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: ['name', 'place', 'date', 'isFree'],
      },
    },
  ],
  branding: {
    companyName: 'Database dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
