import { Sequelize } from "sequelize-typescript";
import config from 'config'
import DevelopmentTeam from "../models/DevelopmentTeam";
import Meeting from "../models/Meeting";

const sequelize = new Sequelize({
    dialect: 'mysql',
    models: [DevelopmentTeam, Meeting], // <= add all sequelize models here
    logging: console.log,
    ...config.get('db')
})

console.log(`connected to database on `, config.get('db'))

export default sequelize