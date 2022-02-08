import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('logindb', 'root', 'dogg', {
    dialect: 'mysql',
    host: 'localhost', 
    port: 3306,
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    },
});
export default sequelize;
