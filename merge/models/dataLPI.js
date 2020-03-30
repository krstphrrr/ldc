/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dataLpi', {
		lineKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'LineKey'
		},
		recKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RecKey'
		},
		dateModified: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateModified'
		},
		formType: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'FormType'
		},
		formDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'FormDate'
		},
		observer: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Observer'
		},
		recorder: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Recorder'
		},
		dataEntry: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'DataEntry'
		},
		dataErrorChecking: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'DataErrorChecking'
		},
		direction: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Direction'
		},
		measure: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Measure'
		},
		lineLengthAmount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'LineLengthAmount'
		},
		spacingIntervalAmount: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpacingIntervalAmount'
		},
		spacingType: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'SpacingType'
		},
		heightOption: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'HeightOption'
		},
		heightUom: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'HeightUOM'
		},
		showCheckbox: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'ShowCheckbox'
		},
		checkboxLabel: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'CheckboxLabel'
		},
		primaryKey: {
			type: DataTypes.TEXT,
			allowNull: true,
			references: {
				model: 'dataHeader',
				key: 'PrimaryKey'
			},
			field: 'PrimaryKey'
		},
		dbKey: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'DBKey'
		},
		pointLoc: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PointLoc'
		},
		pointNbr: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PointNbr'
		},
		shrubShape: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ShrubShape'
		},
		layer: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'layer'
		},
		code: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'code'
		},
		chckbox: {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'chckbox'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'source'
		}
	}, {
		tableName: 'dataLPI'
	});
};
