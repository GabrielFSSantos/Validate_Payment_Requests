import {Model, DataTypes} from 'sequelize';
import sequelize from '../database';

class Payment extends Model {
  payment_id!: string;
  initial_value!: number;
  final_value!: number;
  date!: Date;
  status!: string;
  reason!: string;
}

Payment.init({
  payment_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  initial_value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  final_value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reason: {
    type: DataTypes.STRING
  }
},
{
  sequelize,
  tableName: 'payment',
  timestamps: true
});

export default Payment;