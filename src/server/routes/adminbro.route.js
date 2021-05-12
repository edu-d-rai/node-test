import { sequelize } from '../../data/models';

const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(AdminBroSequelize);
const adminBro = new AdminBro({
  rootPath: '/admin',
  resources: [
  {
      resource: sequelize.models.M1,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: [
          'id',
        ],
      },
    }
,
  {
      resource: sequelize.models.M2,
      options: {
        parent: {
          name: 'Database',
          icon: 'Api',
        },
        listProperties: [
          'id',
        ],
      },
    }
,
  ],
  branding: {
    companyName: 'Node Admin Bro dashboard',
    softwareBrothers: false,
    logo: false,
    favicon: 'https://imagine.ai/img/favicon.ico',
  },
});
const router = AdminBroExpress.buildRouter(adminBro);

export { router as adminbroRouter };
