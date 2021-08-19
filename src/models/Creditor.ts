import {Model, DataTypes} from 'sequelize';
import sequelize from '../database';

class Creditor extends Model {
  creditor_id!: string;
  name!: string;
  cpf!: string;
  status!: string;
}

Creditor.init({
  creditor_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
},
{
  sequelize,
  tableName: 'creditor',
  timestamps: true
});

export default Creditor;