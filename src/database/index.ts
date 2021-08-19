import {Sequelize} from 'sequelize';
import dbConfig from '../config/database';

import dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(process.env.DB_HOST || '', dbConfig);
try {
  connection.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default connection;