import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // if we are running tests or in a test env we preppend test to the db name
  database: env === 'test' ? `test_${process.env.DB_NAME}` : process.env.DB_NAME,
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  // the storage option is only for sqlite
  storage: env === 'test' ? ':memory:' : process.env.DB_STORAGE,
  define: {
    underscore: true,
  },
  logging: false,
};
