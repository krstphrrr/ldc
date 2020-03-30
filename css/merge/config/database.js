// const conf = require('./conf');
// const str = conf.connStr();
const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_STR, {
    dialect: 'postgres',
    operatorsAliases: 0,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
})
