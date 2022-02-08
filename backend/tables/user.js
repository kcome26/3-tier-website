import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

const User = sequelize.define('users', {
   id: { //PRIMARY KEY
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   email: { //EMAIL
      type: Sequelize.STRING,
      allowNull: false,
   },
   name: { //NAME
      type: Sequelize.STRING,
   },
   password: { //PASSWORD
      type: Sequelize.STRING,
      allowNull: false,
   },
});

export default User;