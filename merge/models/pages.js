/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pages', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 'nextval(page_inc_ldc::regclass)',
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
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'url'
		},
		groupId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'group_id'
		}
	}, {
		tableName: 'pages'
	});
};
