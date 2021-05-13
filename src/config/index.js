import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  // if we are running tests or in a test env we preppend test to the db name
  database: env === 'test' ? `test_${process.env.POSTGRES_DB}` : process.env.POSTGRES_DB,
  dialect: process.env.DB_DIALECT,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  define: {
    underscore: true,
  },
  logging: false,
};
