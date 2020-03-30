const Sequelize = require('sequelize')
const db = require("../config/database")
// const Header = require('../models/dataHeader')



const geoSpecies =  db.define('geoSpecies', {
		ogcFid: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ogc_fid'
		},
		ahSpeciesCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_SpeciesCover'
		},
		ahSpeciesCoverN: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_SpeciesCover_n'
		},
		dbKey: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'DBKey'
		},
		duration: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Duration'
		},
		globalId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'GlobalID'
		},
		growthHabit: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'GrowthHabit'
		},
		growthHabitSub: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'GrowthHabitSub'
		},
		hgtSpeciesAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Species_Avg'
		},
		hgtSpeciesAvgN: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Species_Avg_n'
		},
		latitudeNad83: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'latitude_nad83'
		},
		longitudeNad83: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Longitude_NAD83'
		},
		noxious: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Noxious'
		},
		plotId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'PlotID'
		},
		primaryKey: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'PrimaryKey'
		},
		sgGroup: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'SG_Group'
		},
		species: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Species'
		},
		speciesState: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'SpeciesState'
		},
		createdDate: {
			type: Sequelize.DATE,
			allowNull: true,
			field: 'created_date'
		},
		createdUser: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'created_user'
		},
		lastEditedDate: {
			type: Sequelize.DATE,
			allowNull: true,
			field: 'last_edited_date'
		},
		lastEditedUser: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'last_edited_user'
		},
		wkbGeometry: {
			type: Sequelize.GEOMETRY('Point', 4326),
			allowNull: true,
			field: 'wkb_geometry'
		},
		dateLoadedInDb: {
			type: Sequelize.DATEONLY,
			allowNull: true,
			field: 'DateLoadedInDb'
		},
		public: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'Public'
		}
	}, {
		tableName: 'geoSpecies',
		createdAt: false,
		updatedAt:false
	});
	module.exports = geoSpecies
