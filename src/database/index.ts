import {Sequelize} from 'sequelize';
import * as mysql2 from 'mysql2';

import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME || '', 
  process.env.DB_USER || '',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2,
  }
);

try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default connection;