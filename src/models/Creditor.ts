import {Model, DataTypes} from 'sequelize';
import sequelize from '../database';
import Payment from './Payment';

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
  timestamps: false
});

Creditor.hasMany(Payment, { foreignKey: 'creditor_id', as: 'payment',  onUpdate: 'CASCADE', onDelete: 'CASCADE'});

export default Creditor;