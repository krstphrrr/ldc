var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);
var topojson = require("topojson-server");
var topoSimp = require("topojson-simplify");
var async = require('async');
var bcrypt = require('bcrypt');

// trying to merge my node to this one
const bodyParser = require('body-parser')
const db = require('../merge/config/database')

app.use(bodyParser.json())
// headers for cross origin resource sharing errors!
app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH')
  res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('set-cookie',[
    'same-site-cookie=bar; SameSite=None; Secure'
  ])
  next


///
const { Pool } = require("pg");

app.get("/", function(req, res) {
  res.send('<h1>Landscape Data Commons</h1><p style="color:blue;">Listening for queries...test7</p>');
});


//old
// http.listen(3121, function() {
//   console.log("listening on *:3121");
// });

db
// the request thru socket does not use samesite cookie..
  .sync({logging:false})  
    .catch(err=>{
    console.log(err)
  }).then(result =>{
      const server = app.listen(process.env.PORT || 3121)
      const io = require('../merge/socket').init(server)
      io.on('connection', socket=>{



        console.log('connected!')
        

        socket.on('fetchpoints', tmpData=>{
          
          console.log(tmpData.params)
          let existingIds = new Set()
          let whereResults;
          // 
          paramList = "SELECT "
          let testList = ["one", "two","three", "four"]
          for(let i in testList){
            // if length is one: no comma
            if(testList.length===1){
              paramList+=`"${testList[i]}" `
            // if is larger: comma after each
            } else {
              // until it reaches end of array! then no comma
              if (i==testList.indexOf(testList[testList.length-1])){
                paramList+=`"${testList[i]}" `
              } else {
                paramList+=`"${testList[i]}", `
              }
            }
          }
          
          // let [a,b] = testList
          //  let whereSelect = `SELECT ${}`
          console.log(paramList)
         
          let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't' AND \"Public\"= true;",{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){

                  
                  tmpKeys = Object.keys(points[i])
                  // console.log(tmpKeys)
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      // console.log(key)
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    
                    // existingIds.push(row.ogc_fid)
                    // console.log(existingIds,"cannot add")
                    
                    if (!existingIds.has(row.ogc_fid)){
                        tmpJSON.features.push({
                          "type":"Feature",
                          "id":row.ogc_fid, 
                          "properties": tmpProps,
                          "geometry":row.wkb_geometry})
                        existingIds.add(row.ogc_fid)
                      }
                    
                    // console.log(tmpJSON)
                    
                  })
                  // console.log(points[i])
                  
                }
                
              }
              
              socket.emit('pointssend', tmpJSON)

            })
        })

        socket.on('onpublic', tmpData=>{
          console.log('onpublic')
          let existingIds = new Set()
          let whereQ;
          if(tmpData.public===true){
            whereQ = "AND \"Public\"= true;"
            let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't'"+whereQ,{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){

                  
                  tmpKeys = Object.keys(points[i])
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    if (!existingIds.has(row.ogc_fid)){
                      let fuzzPoint = {'type':'Point', 'coordinates':[]}
                      let ranCoord = (Math.random()*0.01)
                      let fuzzLng = (row.wkb_geometry.coordinates[0]+ranCoord)
                      let fuzzLat = (row.wkb_geometry.coordinates[1]+ranCoord)
                      
                      console.log(fuzzPoint)
                      // console.log(row.wkb_geometry.coordinates, [fuzzLng, fuzzLat])
                      if(row.Public===false){
                        // push new fuzzed coords into geometry object
                      }
                      // console.log(fuzzPoint)
                      tmpJSON.features.push({
                        "type":"Feature",
                        "id":row.ogc_fid, 
                        "properties": tmpProps,
                        "geometry":row.wkb_geometry})
                      existingIds.add(row.ogc_fid)
                    }
                    // console.log(tmpJSON.features)
                  })
                }
              }
              socket.emit('pointssend', tmpJSON)

            })
            // console.log(tmpData)
          } else {
            whereQ = ";"
            let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't'"+whereQ,{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){
                  tmpKeys = Object.keys(points[i])
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    if (!existingIds.has(row.ogc_fid)){
                      tmpJSON.features.push({
                        "type":"Feature",
                        "id":row.ogc_fid, 
                        "properties": tmpProps,
                        "geometry":row.wkb_geometry})
                      existingIds.add(row.ogc_fid)
                    }
                    // console.log(tmpJSON)
                  })
                }
              }
              socket.emit('pointssend', tmpJSON)

            })
          }

          socket.on('fetchpoints', tmpData=>{
          // tmpBounds
          let existingIds = new Set()


          let whereQuery = db.query(
              'SELECT "ogc_fid", "Public", "wkb_geometry" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' 
          + tmpData.bounds._southWest.lng + ', '  
          + tmpData.bounds._southWest.lat + ', ' 
          + tmpData.bounds._northEast.lng + ', ' 
          + tmpData.bounds._northEast.lat + ", 4326)) = 't' AND \"Public\"= true;",{
              nest:true,
              logging:console.log,
              type:QueryTypes.SELECT,
              raw:true
            }).then(points=>{
              let resList = []
              let tmpKeys
              let tmpJSON = {"type":"FeatureCollection", "features":[]}
              for(let i in points){
                resList.push(points[i])
                if(points[i]){

                  
                  tmpKeys = Object.keys(points[i])
                  // console.log(tmpKeys)
                  resList.forEach(row=>{
                    tmpProps = {}
                    tmpKeys.forEach(key=>{
                      // console.log(key)
                      tmpProps[key] = row[key]
                    })
                    // console.log(row)
                    
                    // existingIds.push(row.ogc_fid)
                    // console.log(existingIds,"cannot add")
                    
                    if (!existingIds.has(row.ogc_fid)){
                        tmpJSON.features.push({
                          "type":"Feature",
                          "id":row.ogc_fid, 
                          "properties": tmpProps,
                          "geometry":row.wkb_geometry})
                        existingIds.add(row.ogc_fid)
                      }
                    
                    // console.log(tmpJSON)
                    
                  })
                  // console.log(points[i])
                  
                }
                
              }
              
              socket.emit('pointssend', tmpJSON)

            })
        })

        })
        socket.on('poly_bounds__sent', tmpData=>{
          console.log('received..', tmpData)
          socket.emit('poly_geojson_cameback', 'something2')
         })


// old code//////////////////////////////////////////////////////////
        socket.on("disconnect", function() {
          console.log("user disconnected");
        });
      
        socket.on("test", function(tmpData) {
          console.log(tmpData);
          socket.emit("test", tmpData + " back at ya!");
        });
      
        socket.on("login", function(tmpData) {
          console.log("Logging in " + tmpData.user);
          var tmpQueries = [];
          tmpQueries.push("SELECT password, data_filter FROM users WHERE username = '" + tmpData.user + "';");
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            for(var i in results) {
              if(results[i].rowCount > 0) {
                var hash = results[i].rows[0].password;
                hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
                bcrypt.compare(tmpData.password, hash, function(err, res) {
                  if(res == true) {
                    socket.emit("login", {"code": 200, "check": "lDc420", "data_filter": results[i].rows[0].data_filter});  //Credentials are valid; 'check' object can be any string, just has to match the 'status' object in the secure code below
                  }
                  else {
                    socket.emit("login", {"code": 401, "check": false, "data_filter": ""});  //User name is valid but password is not
                  }
                });
              }
              else {
                socket.emit("login", {"code": 404, "check": false, "data_filter": ""});  //User name does not exist
              }
            }
          });    
        });
      
        socket.on("secure", function(tmpData) {
          console.log("Adjusting security...");
          if(tmpData.match == "true") {
            socket.emit("secure", {"status": "lDc420", "data_filter": tmpData.data_filter}); //'status' object can be any string, just has to match the 'check' object in the login code above
          }
          else {
            socket.emit("secure", {"status": "nogo400", "data_filter": ""});
          }
        });
      
      
        socket.on("getGeoInd", function(tmpData) {
          console.log("Getting point feature data...");
          var tmpQueries = []; 
          //***Checking for permissions and adjusting query as necessary
          if(tmpData.status == tmpData.check) {
            if(tmpData.data_filter != "") {
              var tmpFilter = JSON.parse(tmpData.data_filter);
            }
            else {
              var tmpFilter = {};
            }
      
            var tmpWhere = ' WHERE "Public" = true';
            var tmpKeys = Object.keys(tmpFilter);
            tmpKeys.forEach(function(key) {
              if(typeof tmpFilter[key] == "string") {
                tmpWhere += ' or "' + key + '" = ' + "'" + tmpFilter[key] + "'";
              }
              else if(typeof tmpFilter[key] == "object") {
                var tmpSubKeys = Object.keys(tmpFilter[key]);
                tmpSubKeys.forEach(function(subKey, i) {
                  if(i == 0) {
                    tmpWhere += ' or ("' + subKey + '" = ' + "'" + tmpFilter[key][subKey] + "'";
                  }
                  else {
                    tmpWhere += ' and "' + subKey + '" = ' + "'" + tmpFilter[key][subKey] + "'";
                  }
                });
                tmpWhere += ")";
              } 
            });
      
            tmpQueries.push('SELECT "ogc_fid", "PrimaryKey", "EcologicalSiteId", "BareSoilCover", "TotalFoliarCover", "Hgt_Woody_Avg", "Hgt_Herbaceous_Avg", "SoilStability_All", "GapCover_200_plus", "County", "State", "Public", ST_asGeoJson("wkb_geometry") FROM "geoIndicators"' + tmpWhere + ';');
          }
          else {
            tmpQueries.push('SELECT "ogc_fid", "PrimaryKey", "EcologicalSiteId", "BareSoilCover", "TotalFoliarCover", "Hgt_Woody_Avg", "Hgt_Herbaceous_Avg", "SoilStability_All", "GapCover_200_plus", "County", "State", "Public", ST_asGeoJson("wkb_geometry") FROM "geoIndicators" WHERE "Public" = true;');
          }
            
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
          if(!err) {
            for(var i in results) {
              //***convert query results to geojson file
              if(results[i].rowCount > 0) {
                var tmpJSON = {"type": "FeatureCollection", "features": []}
                var tmpKeys = Object.keys(results[i].rows[0]);
                results[i].rows.forEach(function(row) {
                  var tmpProps = {};
                  tmpKeys.forEach(function(key) {
                    if(key != "st_asgeojson") {
                      tmpProps[key] = row[key];
                    }
                  });
                  tmpJSON.features.push({"type": "Feature", "id": row.ogc_fid, "properties": tmpProps, "geometry": JSON.parse(row.st_asgeojson)});
                });
              }
            }
          }
          else {
            console.log(err);
            var tmpJSON = {"error": err};
          }
            socket.emit("getGeoInd", tmpJSON);
            pool.end();
          });
        });
          
      
        socket.on("getGeoIndID", function(tmpData) {
          console.log("Getting point ids...");
          var tmpQueries = [];
          //***Query for points contained within the bounding box
          tmpQueries.push('SELECT "ogc_fid" from "geoIndicators" a WHERE ST_Intersects(a.wkb_geometry, ST_MakeEnvelope(' + tmpData.bounds._southWest.lng + ', '  + tmpData.bounds._southWest.lat + ', ' + tmpData.bounds._northEast.lng + ', ' + tmpData.bounds._northEast.lat + ", 4326)) = 't';");
          //tmpQueries.push('WITH tmpBBox (geom) AS (SELECT ST_MakeEnvelope(' + tmpData.bounds._southWest.lng + ', '  + tmpData.bounds._southWest.lat + ', ' + tmpData.bounds._northEast.lng + ', ' + tmpData.bounds._northEast.lat + ', 4326)) SELECT "ogc_fid" from "geoIndicators" a, tmpBBox b WHERE ST_Intersects(a.wkb_geometry, b.geom);');
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            for(var i in results) {
              if(results[i].rowCount > 0) {
                var tmpJSON = results[i].rows;
              }
              else {
                var tmpJSON = [];
              }
            }
            socket.emit("getGeoIndID", tmpJSON);
            pool.end();
          });
        });
      
      
        socket.on("getGeoInd_sj", function() {
          console.log("Getting point spatial join IDs...");
          var tmpQueries = [];
          //***Query for all records in the geoInd_sj table
          tmpQueries.push('SELECT * from "geoInd_sj" ORDER BY "geoIndicators";');
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            if(!err) {
              for(var i in results) {
                if(results[i].rowCount > 0) {
                  var tmpJSON = results[i].rows;
                }
                else {
                  var tmpJSON = [];
                }
              }
            }
            else {
              console.log(err);
              var tmpJSON = [];
            } 
            socket.emit("getGeoInd_sj", tmpJSON);
            pool.end();
          });
        });
      
      
      
      
        socket.on("getDownload", function(tmpData) {
          console.log("Getting download data...");
      
          var tmpQueries = [];
          var tmpTables = [];
          //***Determine which tables to output
          if(tmpData.tables.indicators == true) {
            tmpQueries.push('SELECT *, ST_asGeoJSON(wkb_geometry) AS coords FROM "geoIndicators" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("geoIndicators");
          }
          
          if(tmpData.tables.species == true) {
            tmpQueries.push('SELECT *, ST_asGeoJSON(wkb_geometry) AS coords FROM "geoSpeciesInventory" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("geoSpeciesInventory");
          }
      
          if(tmpData.tables.raw == true) {
            tmpQueries.push('SELECT * FROM "dataGap" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataGap");
            tmpQueries.push('SELECT * FROM "dataHeader" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataHeader");
            tmpQueries.push('SELECT * FROM "dataHeight" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataHeight");
            tmpQueries.push('SELECT * FROM "dataLPI" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataLPI");
            tmpQueries.push('SELECT * FROM "dataSoilStability" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataSoilStability");
            tmpQueries.push('SELECT * FROM "dataSpeciesInventory" WHERE "PrimaryKey" IN (' + tmpData.ids.toString() + ');');
            tmpTables.push("dataSpeciesInventory");
          }
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            for(var i in results) {
              results[i].table = tmpTables[i]
            }
      
            socket.emit("getDownload", results);
            pool.end();
          });
        });
      
      
      
      
      
        socket.on("getGeoSpe", function() {
          console.log("Getting geoSpe...");
         
          var tmpQueries = [];
          //tmpData.tmpLayers.forEach(function(layer, i) {
            tmpQueries.push('select "PrimaryKey", "Species", "AH_SpeciesCover", "Hgt_Species_Avg", "GrowthHabitSub", "Duration", "Noxious", ST_AsGeoJSON(wkb_geometry, 6) from public."geospe" limit 50000;');
            //tmpQueries.push('select primarykey, species, ah_speciescover, hgt_species_avg, growthhabitsub, duration, noxious, ST_AsGeoJSON(wkb_geometry, 6) from public.geospe;');
            //tmpQueries.push('select "PrimaryKey", ST_AsGeoJSON(wkb_geometry, 6) from public.geospe');
          //}); 
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          //var tmpOut = {};
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            //console.log(query);
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            console.log(err);
            console.log(results);
            for(var i in results) {
              if(results[i].rowCount > 0) {
                var tmpJSON = {"type": "FeatureCollection", "features": []}
                var tmpKeys = Object.keys(results[i].rows[0]);
                results[i].rows.forEach(function(row) {
                  var tmpProps = {};
                  tmpKeys.forEach(function(key) {
                    if(key != "st_asgeojson") {
                      tmpProps[key] = row[key];
                    }
                  });
                  tmpJSON.features.push({"type": "Feature", "id": row.primarykey, "properties": tmpProps, "geometry": JSON.parse(row.st_asgeojson)});
                });
      
                //var tmpTopo = topojson.topology({temp: tmpJSON});
                //var tmpTopoPre = topoSimp.presimplify(tmpTopo);
                //var tmpTopoSimp = topoSimp.simplify(tmpTopoPre, 0.0001);
                //tmpOut[tmpData.tmpLayers[i]] = tmpTopoSimp;
              }
            }
            //tmpOut.layers = tmpData.tmpLayers;
            //tmpOut.id = tmpData.infoID;
            socket.emit("getGeoSpe", tmpJSON);
            pool.end();
          });
        });
      
      
      
        socket.on("getLayers", function(tmpData) {
          console.log("Getting layers...");
         
          var tmpQueries = [];
          tmpData.tmpLayers.forEach(function(layer, i) {
            tmpQueries.push("SELECT gid, " + tmpData.infoID[i] + ", ST_AsGeoJSON(geom, 6) from gis." + layer + " a WHERE ST_Intersects(a.geom, ST_MakeEnvelope(" + tmpData.bounds._southWest.lng + ", "  + tmpData.bounds._southWest.lat + ", " + tmpData.bounds._northEast.lng + ", " + tmpData.bounds._northEast.lat + ", 4326)) = 't';");
          }); 
      
          const pool = new Pool({
            user: "ldc2",
            host: "localhost",
            database: "gisdb",
            password: "pg#ldc2",
            port: 5432,
          });
      
          var tmpOut = {};
          var queue = [];
          tmpQueries.forEach(function(query,i) {
            //console.log(query);
            queue.push(pool.query.bind(pool, query));
          });
      
          async.parallel(queue, function(err, results) {
            for(var i in results) {
              if(results[i].rowCount > 0) {
                var tmpJSON = {"type": "FeatureCollection", "features": []}
                var tmpKeys = Object.keys(results[i].rows[0]);
                results[i].rows.forEach(function(row) {
                  var tmpProps = {};
                  tmpKeys.forEach(function(key) {
                    if(key != "st_asgeojson") {
                      tmpProps[key] = row[key];
                    }
                  });
                  tmpJSON.features.push({"type": "Feature", "id": row.gid, "properties": tmpProps, "geometry": JSON.parse(row.st_asgeojson)});
                });
      
                var tmpTopo = topojson.topology({temp: tmpJSON});
                var tmpTopoPre = topoSimp.presimplify(tmpTopo);
                var tmpTopoSimp = topoSimp.simplify(tmpTopoPre, 0.0001);
                tmpOut[tmpData.tmpLayers[i]] = tmpTopoSimp;
              }
            }
            tmpOut.layers = tmpData.tmpLayers;
            tmpOut.id = tmpData.infoID;
            socket.emit("getLayers", tmpOut);
            pool.end();
          });
        });

//old /////////////////////////////////////////////////////////////////////
      })
  })
})
