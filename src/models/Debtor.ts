import {Model, DataTypes} from 'sequelize';
import sequelize from '../database';

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

export default Debtor;