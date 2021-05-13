import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';

module.exports = {
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  // if we are running tests or in a test env we preppend test to the db name
  database: env === 'test' ? `test_${process.env.MYSQL_DATABASE}` : process.env.MYSQL_DATABASE,
  dialect: process.env.DB_DIALECT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  define: {
    underscore: true,
  },
  logging: false,
};
