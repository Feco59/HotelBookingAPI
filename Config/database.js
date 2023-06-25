import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config({path: './.env'});

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host:process.env.MYSQL_HOST,
    dialect: 'mysql',
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
     idle: 10000
    }
  }
)

export default sequelize;