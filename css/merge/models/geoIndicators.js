/* jshint indent: 1 */
const Sequelize = require('sequelize')
const db = require("../config/database")
const Header = require('../models/dataHeader')



const geoIndicators =  db.define('geoIndicators', {
		ogcFid: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ogc_fid'
		},
		ahAnnGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_AnnGrassCover'
		},
		ahForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_ForbCover'
		},
		ahGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_GrassCover'
		},
		ahNonNoxAnnForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnForbCover'
		},
		ahNonNoxAnnForbGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnForbGrassCover'
		},
		ahNonNoxAnnGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxAnnGrassCover'
		},
		ahNonNoxCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxCover'
		},
		ahNonNoxPerenForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenForbCover'
		},
		ahNonNoxPerenForbGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenForbGrassCover'
		},
		ahNonNoxPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxPerenGrassCover'
		},
		ahNonNoxShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxShrubCover'
		},
		ahNonNoxSubShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxSubShrubCover'
		},
		ahNonNoxSucculentCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxSucculentCover'
		},
		ahNonNoxTreeCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonNoxTreeCover'
		},
		ahNonSagebrushShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NonSagebrushShrubCover'
		},
		ahNoxAnnForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnForbCover'
		},
		ahNoxAnnForbGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnForbGrassCover'
		},
		ahNoxAnnGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxAnnGrassCover'
		},
		ahNoxCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxCover'
		},
		ahNoxPerenForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenForbCover'
		},
		ahNoxPerenForbGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenForbGrassCover'
		},
		ahNoxPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxPerenGrassCover'
		},
		ahNoxShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxShrubCover'
		},
		ahNoxSubShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxSubShrubCover'
		},
		ahNoxSucculentCover: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'AH_NoxSucculentCover'
		},
		ahNoxTreeCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_NoxTreeCover'
		},
		ahPerenForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_PerenForbCover'
		},
		ahPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_PerenGrassCover'
		},
		ahPerenGrassForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_PerenGrassForbCover'
		},
		ahPreferredForb: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_PreferredForb'
		},
		ahPreferredForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_PreferredForbCover'
		},
		ahSagebrushCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_SagebrushCover'
		},
		ahSagebrushCoverLive: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_SagebrushCover_Live'
		},
		ahShortPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_ShortPerenGrassCover'
		},
		ahShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_ShrubCover'
		},
		ahTallPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'AH_TallPerenGrassCover'
		},
		bareSoilCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'BareSoilCover'
		},
		county: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'County'
		},
		dbKey: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'DBKey'
		},
		dateEstablished: {
			type: Sequelize.DATE,
			allowNull: true,
			field: 'DateEstablished'
		},
		dateLoadedInDb: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'DateLoadedInDb'
		},
		dateVisited: {
			type: Sequelize.DATE,
			allowNull: true,
			field: 'DateVisited'
		},
		elevation: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'ELEVATION'
		},
		ecolSiteName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'EcolSiteName'
		},
		ecologicalSiteId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'EcologicalSiteId'
		},
		fhCyanobacteriaCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_CyanobacteriaCover'
		},
		fhDepSoilCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_DepSoilCover'
		},
		fhDuffCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_DuffCover'
		},
		fhEmbLitterCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_EmbLitterCover'
		},
		fhHerbLitterCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_HerbLitterCover'
		},
		fhLichenCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_LichenCover'
		},
		fhMossCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_MossCover'
		},
		fhNonNoxAnnForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxAnnForbCover'
		},
		fhNonNoxAnnGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxAnnGrassCover'
		},
		fhNonNoxPerenForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxPerenForbCover'
		},
		fhNonNoxPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxPerenGrassCover'
		},
		fhNonNoxShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxShrubCover'
		},
		fhNonNoxSubShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxSubShrubCover'
		},
		fhNonNoxSucculentCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxSucculentCover'
		},
		fhNonNoxTreeCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NonNoxTreeCover'
		},
		fhNoxAnnForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxAnnForbCover'
		},
		fhNoxAnnGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxAnnGrassCover'
		},
		fhNoxPerenForbCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxPerenForbCover'
		},
		fhNoxPerenGrassCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxPerenGrassCover'
		},
		fhNoxShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxShrubCover'
		},
		fhNoxSubShrubCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxSubShrubCover'
		},
		fhNoxSucculentCover: {
			type: Sequelize.INTEGER,
			allowNull: true,
			field: 'FH_NoxSucculentCover'
		},
		fhNoxTreeCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_NoxTreeCover'
		},
		fhRockCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_RockCover'
		},
		fhSagebrushCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_SagebrushCover'
		},
		fhTotalLitterCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_TotalLitterCover'
		},
		fhVagrLichenCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_VagrLichenCover'
		},
		fhWaterCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_WaterCover'
		},
		fhWoodyLitterCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'FH_WoodyLitterCover'
		},
		gapCover101200: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'GapCover_101_200'
		},
		gapCover200Plus: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'GapCover_200_plus'
		},
		gapCover2550: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'GapCover_25_50'
		},
		gapCover25Plus: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'GapCover_25_plus'
		},
		gapCover51100: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'GapCover_51_100'
		},
		globalId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'GlobalID'
		},
		hgtForbAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Forb_Avg'
		},
		hgtGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Grass_Avg'
		},
		hgtHerbaceousAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Herbaceous_Avg'
		},
		hgtNonNoxPerenGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_NonNoxPerenGrass_Avg'
		},
		hgtNonSagebrushShrubAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_NonSagebrushShrub_Avg'
		},
		hgtNoxPerenGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_NoxPerenGrass_Avg'
		},
		hgtPerenForbGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenForbGrass_Avg'
		},
		hgtPerenForbAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenForb_Avg'
		},
		hgtPerenGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_PerenGrass_Avg'
		},
		hgtSagebrushAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Sagebrush_Avg'
		},
		hgtSagebrushLiveAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Sagebrush_Live_Avg'
		},
		hgtShortPerenGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_ShortPerenGrass_Avg'
		},
		hgtTallPerenGrassAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_TallPerenGrass_Avg'
		},
		hgtWoodyAvg: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Hgt_Woody_Avg'
		},
		latitudeNad83: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'latitude_nad83'
		},
		locationType: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'LocationType'
		},
		longitudeNad83: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'Longitude_NAD83'
		},
		numSppNonNoxPlant: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'NumSpp_NonNoxPlant'
		},
		numSppNoxPlant: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'NumSpp_NoxPlant'
		},
		numSppPreferredForb: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'NumSpp_PreferredForb'
		},
		plotkey: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'PLOTKEY'
		},
		percentCoveredByEcoSite: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'PercentCoveredByEcoSite'
		},
		plotId: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'PlotID'
		},
		plotkey2: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'plotkey2'
		},
		primaryKey: {
			type: Sequelize.STRING,
			allowNull: true,
			references: {
				model: "dataHeader",
				key: 'PrimaryKey'
			},
			field: 'PrimaryKey'
		},
		projectName: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'ProjectName'
		},
		rhAnnualProd: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_AnnualProd'
		},
		rhBareGround: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_BareGround'
		},
		rhBioticIntegrity: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_BioticIntegrity'
		},
		rhCommentsBi: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_CommentsBI'
		},
		rhCommentsHf: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_CommentsHF'
		},
		rhCommentsSs: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_CommentsSS'
		},
		rhCompaction: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_Compaction'
		},
		rhDeadDyingPlantParts: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_DeadDyingPlantParts'
		},
		rhFuncSructGroup: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_FuncSructGroup'
		},
		rhGullies: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_Gullies'
		},
		rhHydrologicFunction: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_HydrologicFunction'
		},
		rhInvasivePlants: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_InvasivePlants'
		},
		rhLitterAmount: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_LitterAmount'
		},
		rhLitterMovement: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_LitterMovement'
		},
		rhPedestalsTerracettes: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_PedestalsTerracettes'
		},
		rhPlantCommunityComp: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_PlantCommunityComp'
		},
		rhReprodCapabilityPeren: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_ReprodCapabilityPeren'
		},
		rhRills: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_Rills'
		},
		rhSoilSiteStability: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_SoilSiteStability'
		},
		rhSoilSurfLossDeg: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_SoilSurfLossDeg'
		},
		rhSoilSurfResisErosion: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_SoilSurfResisErosion'
		},
		rhWaterFlowPatterns: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_WaterFlowPatterns'
		},
		rhWindScouredAreas: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RH_WindScouredAreas'
		},
		recordCount: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'RecordCount'
		},
		sagebrushShapeAllColumnCount: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_All_ColumnCount'
		},
		sagebrushShapeAllPredominant: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'SagebrushShape_All_Predominant'
		},
		sagebrushShapeAllSpreadCount: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_All_SpreadCount'
		},
		sagebrushShapeLiveColumnCount: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_Live_ColumnCount'
		},
		sagebrushShapeLivePredominant: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'SagebrushShape_Live_Predominant'
		},
		sagebrushShapeLiveSpreadCount: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SagebrushShape_Live_SpreadCount'
		},
		soilStabilityAll: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SoilStability_All'
		},
		soilStabilityProtected: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SoilStability_Protected'
		},
		soilStabilityUnprotected: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'SoilStability_Unprotected'
		},
		sppNox: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Spp_Nox'
		},
		sppPreferredForb: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Spp_PreferredForb'
		},
		sppSagebrush: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Spp_Sagebrush'
		},
		sppShortPerenGrass: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Spp_ShortPerenGrass'
		},
		sppTallPerenGrass: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'Spp_TallPerenGrass'
		},
		state: {
			type: Sequelize.STRING,
			allowNull: true,
			field: 'State'
		},
		totalFoliarCover: {
			type: Sequelize.DOUBLE,
			allowNull: true,
			field: 'TotalFoliarCover'
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
		public: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			field: 'Public'
		}
	}, {
		tableName: 'geoIndicators',
		createdAt: false,
		updatedAt:false
	})
	module.exports = geoIndicators
