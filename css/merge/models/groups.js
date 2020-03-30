/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('groups', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 'nextval(group_inc_ldc::regclass)',
			primaryKey: true,
			field: 'id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name'
		},
		descr: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'descr'
		}
	}, {
		tableName: 'groups'
	});
};
