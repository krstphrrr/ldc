/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 'nextval(user_inc_ldc::regclass)',
			primaryKey: true,
			field: 'id'
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'firstname'
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'lastname'
		},
		username: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'username'
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'password'
		},
		validationcode: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'validationcode'
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'email'
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'comments'
		},
		joined: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'joined'
		},
		lastLogin: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'last_login'
		},
		active: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'active'
		},
		dataFilter: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'data_filter'
		}
	}, {
		tableName: 'users'
	});
};
