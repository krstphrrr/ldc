/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userGroupLink', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 'nextval(user_group_inc_ldc::regclass)',
			primaryKey: true,
			field: 'id'
		},
		groupId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'group_id'
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'user_id'
		}
	}, {
		tableName: 'user_group_link'
	});
};
