const Sequelize = require('sequelize')
const db = require("../config/database")


const user =  db.define('ng_user', {
  id :{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull:false,
    field:'email'
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false,
    field:'password'
  },
  name: {
    type: Sequelize.STRING,
    allowNull:false,
    field:'name'
  },
  status: {
    type: Sequelize.STRING,
    allowNull:false,
    field:'status'
  },

	}, {
		tableName: 'ng_user',
		createdAt: false,
		updatedAt:false
	});

	module.exports = user