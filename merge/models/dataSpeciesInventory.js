/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dataSpeciesInventory', {
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
		specRichMethod: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRichMethod'
		},
		specRichMeasure: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRichMeasure'
		},
		specRichNbrSubPlots: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRichNbrSubPlots'
		},
		specRich1Container: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRich1Container'
		},
		specRich1Shape: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRich1Shape'
		},
		specRich1Dim1: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRich1Dim1'
		},
		specRich1Dim2: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRich1Dim2'
		},
		specRich1Area: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'SpecRich1Area'
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
		species: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Species'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'source'
		},
		speciesCount: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'SpeciesCount'
		},
		density: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Density'
		},
		plotkey: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Plotkey'
		},
		dateLoadedInDb: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		}
	}, {
		tableName: 'dataSpeciesInventory'
	});
};
