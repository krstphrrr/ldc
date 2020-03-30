/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dataGap', {
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
			type: DataTypes.DOUBLE,
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
		gapMin: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapMin'
		},
		gapData: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapData'
		},
		perennialsCanopy: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PerennialsCanopy'
		},
		annualGrassesCanopy: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AnnualGrassesCanopy'
		},
		annualForbsCanopy: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AnnualForbsCanopy'
		},
		otherCanopy: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'OtherCanopy'
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Notes'
		},
		noCanopyGaps: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NoCanopyGaps'
		},
		noBasalGaps: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'NoBasalGaps'
		},
		perennialsBasal: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'PerennialsBasal'
		},
		annualGrassesBasal: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AnnualGrassesBasal'
		},
		annualForbsBasal: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'AnnualForbsBasal'
		},
		otherBasal: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'OtherBasal'
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
		seqNo: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'SeqNo'
		},
		recType: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'RecType'
		},
		gapStart: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapStart'
		},
		gapEnd: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'GapEnd'
		},
		gap: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'Gap'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'source'
		},
		state: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'State'
		},
		plotKey: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'PlotKey'
		},
		dateLoadedInDb: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		}
	}, {
		tableName: 'dataGap'
	});
};
