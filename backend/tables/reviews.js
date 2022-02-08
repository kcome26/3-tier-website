import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

const Reviews = sequelize.define('reviews', {
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
      allowNull: false,
   },
   rating: { //Rating
      type: Sequelize.INTEGER,
      allowNull: false,
   },
   comment: { //Comment
    type: Sequelize.STRING,
 },
});
export default Reviews