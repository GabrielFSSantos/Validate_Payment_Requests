import {Model, DataTypes} from 'sequelize';
import sequelize from '../database';
import Payment from './Payment';

class Debtor extends Model {
  debtor_id!: string;
  name!: string;
  cnpj!: string;
}

Debtor.init({
  debtor_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  }
},
{
  sequelize,
  tableName: 'debtor',
  timestamps: true
});

Debtor.hasMany(Payment, { foreignKey: 'debtor_id', as: 'payment',  onUpdate: 'CASCADE', onDelete: 'CASCADE'});

export default Debtor;