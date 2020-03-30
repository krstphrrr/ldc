/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dataSoilStability', {
		plotKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PlotKey'
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
		lineKey: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'LineKey'
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
		soilStabSubSurface: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SoilStabSubSurface'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Notes'
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
		position: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Position'
		},
		line: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Line'
		},
		pos: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Pos'
		},
		veg: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Veg'
		},
		rating: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Rating'
		},
		hydro: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Hydro'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'source'
		},
		dateLoadedInDb: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		}
	}, {
		tableName: 'dataSoilStability'
	});
};
