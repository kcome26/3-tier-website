import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

const Playlist = sequelize.define('playlists', {
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
   songs: { //SONGS
      type: Sequelize.JSON,
   },
});
export default Playlist