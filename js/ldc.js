function initPage() {

  //******Initialize bootstrap tooltip
  $(function() {
    $('[data-toggle="tooltip"]').tooltip();
  });

  //******Adjust div position to ensure that it isn't overflowing window
      function resizePanels() {
        var bodyRect = document.body.getBoundingClientRect();
        var tmpWindows = ["legendDiv", "infoDiv", "locateDiv"];
        
        tmpWindows.forEach(function(win) {
          var winRect = document.getElementById(win).getBoundingClientRect();
          if(winRect.bottom > bodyRect.bottom) {
            d3.select("#" + win).style("top", bodyRect.height - winRect.height + "px");
          }
          if(winRect.right > bodyRect.right) {
            d3.select("#" + win).style("left", bodyRect.width - winRect.width + "px");
          }
        });
      }


  var map = new L.Map('map', {attributionControl: false, zoomControl: false, minZoom: 3, maxZoom: 20, inertiaDeceleration: 1000, worldCopyJump: true, maxBounds: [[115,-240],[-115,240]]});
  map.fitBounds([[50, -125],[23,-65]]);
  L.control.mousePosition().addTo(map);

  //***Bing geocoder control
  var tmpPoint = new L.marker;
  var bingGeocoder = new L.Control.BingGeocoder('At3gymJqaoGjGje-JJ-R5tJOuilUk-gd7SQ0DBZlTXTsRoMfVWU08ZWF1X7QKRRn', { callback: function (results)
    {
      if(results.statusCode == 200) {
        if(d3.select("#bingGeocoderSubmit").classed("fa-search")) {
          $(document).ready(function(){
            $('[data-toggle="tooltip"]').tooltip();   
          });
          document.getElementById("bingGeocoderInput").blur();
          var bbox = results.resourceSets[0].resources[0].bbox,
            first = new L.LatLng(bbox[0], bbox[1]),
            second = new L.LatLng(bbox[2], bbox[3]),
            tmpBounds = new L.LatLngBounds([first, second]);
          this._map.fitBounds(tmpBounds);
          this._map.removeLayer(tmpPoint);
          tmpPoint = new L.marker(results.resourceSets[0].resources[0].point.coordinates);
          this._map.addLayer(tmpPoint);
          d3.select(".leaflet-marker-icon")
            .attr("id","mapIcon")
            .attr("value", results.resourceSets[0].resources[0].name)
            .attr("data-toggle", "tooltip")
            .attr("data-container", "body")
            .attr("data-placement", "top")
            .attr("data-html", "true")
            .attr("title", '<p><b>' + results.resourceSets[0].resources[0].name + '</b></p>');
          d3.select(tmpPoint)
            .on("click", function() { clearSearch(); });
          d3.select("#bingGeocoderSubmit")
            .classed("fa-search", false)
            .classed("fa-times", true)
            .property("title", "Click to clear locate results");
        }
        else {
          clearSearch();
        }
      }
      else {
        d3.select("#bingGeocoderInput").property("value","No matching results");    
      }
    }
  });


  //******Make headerControls div
  d3.select("body")
    .insert("div", ":first-child")
    .attr("id", "headerControls");




  //******Make div for geolocater
  d3.select("body")
    .append("div")
    .attr("class", "legend gradDown")
    .attr("id", "locateDiv");

  $('#locateDiv').draggable({containment: "html", cancel: ".toggle-group,input,textarea,button,select,option"});

  d3.select("#locateDiv")
    .append("h4")
    .text("Locate")
    .attr("class", "legTitle")
    .attr("id", "locateTitle")
    .append("span")
    .html('<span class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><u><b>Locate</b></u></p><p>Enter name or coordinates to zoom to a location on the map.</p>"</span>');
 
  d3.select("#locateTitle")
    .html(d3.select("#locateTitle").html() + '<div class="exitDiv"><span id="hideLocate" class="fa fa-times-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p>Click to hide window</p>"</span></div>'); 

  d3.select("#hideLocate")
    .on("click", function() { toolWindowToggle("locate"); });

  d3.select("#locateDiv")
    .append("div")
    .attr("id", "bingGeoLocate");



  document.getElementById('bingGeoLocate').appendChild(bingGeocoder.onAdd(map));
  d3.select("#bingGeocoderInput")
    .on("mouseup", function() { if(this.value == "No matching results") { this.value = ""; } else { $(this).select(); } })
    .on("blur", function() { modifySearch(this, "blur"); })
    .on("keyup", function() { modifySearch(this, "key"); });

  function modifySearch(tmpEl, tmpEvent) {
    if(tmpEvent == "blur") {
      if((tmpEl.value == "" || tmpEl.value == "No matching results") && document.getElementById("mapIcon")) { 
        tmpEl.value = d3.select("#mapIcon").attr("value"); 
        d3.select("#bingGeocoderSubmit").classed("fa-times", true).classed("fa-search", false);
      }
      else if(tmpEl.value == "No matching results" && !document.getElementById("mapIcon")) {
        tmpEl.value = "";
      }
    } 
    else if(document.getElementById("mapIcon")) {
      if(tmpEl.value != d3.select("#mapIcon").attr("value")) {
        d3.select("#bingGeocoderSubmit").classed("fa-times", false).classed("fa-search", true);
      }
      else {
        d3.select("#bingGeocoderSubmit").classed("fa-times", true).classed("fa-search", false);
      }
    }
  }





  //******Clear the results of the geo search
  function clearSearch() {
    map.removeLayer(tmpPoint);
    d3.select(".tooltip").remove();
    d3.select("#bingGeocoderInput").property("value", "");

    d3.select("#bingGeocoderSubmit")
      .classed("fa-times", false)
      .classed("fa-search", true)
      .style("background", "")
      .property("title", "Click to zoom to specified location");
  }


  //***Add in backgrounds
  var googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var googleSatellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }); 
  var googleStreet = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
/*
  var usgsTopo = new L.tileLayer('https://basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 15,
    zIndex: 0,
    attribution: '<a href="http://www.doi.gov">U.S. Department of the Interior</a> | <a href="https://www.usgs.gov">U.S. Geological Survey</a> | <a href="https://www.usgs.gov/laws/policies_notices.html">Policies</a>'
  });
*/
  var countries = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:countries_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

  var blank = new L.tileLayer('');


  //***Add in overlays
  var states = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:tl_2017_us_state_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

  var counties = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:tl_2017_us_county_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

  var surf = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:surface_mgt_agency_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

  var mlra = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:mlra_v42_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

  var statsgo = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:statsgo_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });

var huc8 = L.tileLayer.wms('https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms', {
    layers: 'ldc:wbdhu8_wgs84',
    format: 'image/png',
    transparent: true,
    tiled: true,
    version: '1.3.0',
    maxZoom: 20
  });



  var opaVar = [states, counties, surf, mlra, statsgo, huc8];
  var infoObj = {"tl_2017_us_state_wgs84": "US States", "tl_2017_us_county_wgs84": "US Counties", "surface_mgt_agency_wgs84": "Mgt. Agency", "mlra_v42_wgs84": "MLRA", "statsgo_wgs84": "STATSGO", "wbdhu8_wgs84": "HUC-8"};
  var overlayID = d3.keys(infoObj);
  var baselayers = {"Google Terrain": googleTerrain, "Google Hybrid": googleHybrid, "Google Satellite": googleSatellite, "Google Street": googleStreet, "Country Borders": countries, "None": blank};
  var overlays = {"US States": states, "US Counties": counties, "Management Agency": surf, "LRR/MLRA": mlra, "STATSGO": statsgo, "HUC-8": huc8};
  var overlayTitles = d3.keys(overlays);
  //L.control.layers(baselayers, overlays).addTo(map);

  //******Make layer controller
  //***baselayers
  var layerNames = {};
  layerNames.baseLayers = baselayers; //{"Google Terrain": googleTerrain, "Google Hybrid": googleHybrid, "Google Satellite": googleSatellite, "Google Street": googleStreet, "None": blank};
  layerNames.baseLayers.keys = d3.keys(layerNames.baseLayers);
  layerNames.baseLayers.values = d3.values(layerNames.baseLayers);


  //***Overlay layers
  layerNames.overlays = {};
  overlayTitles.forEach(function(tmpTitle,i) {
    layerNames.overlays[tmpTitle] = opaVar[i];
  });
  layerNames.overlays.keys = d3.keys(overlays);
  layerNames.overlays.values = d3.values(overlays);



  d3.select("#headerControls")
    .insert("div", ":first-child")
    .attr("id", "mapTools")
    .append("div")
    .attr("id", "baselayerSelect")
    .attr("class", "layerList")
    .append("div")
    .attr("id", "baselayerList")
    .attr("class", "cl_select")
    .property("title", "Click to change map baselayer")
    .html('<span id="baselayerListHeader">Change Baselayer</span><span class="fa fa-caret-down pull-right" style="position:relative;top:3px;"></span>')
    .on("click", function() { if(d3.select("#baselayerListDropdown").style("display") == "none") {d3.select("#baselayerListDropdown").style("display", "inline-block");} else {d3.select("#baselayerListDropdown").style("display", "none");} });;

  d3.select("#baselayerSelect")
    .append("div")
    .attr("id", "baselayerListDropdown")
    .attr("class", "layerListDropdown")
    .on("mouseleave", function() { d3.select(this).style("display", "none") });

  //******Add baselayer options
  d3.select("#baselayerListDropdown").selectAll("div")
    .data(layerNames.baseLayers.keys)
    .enter()
      .append("div")
      .attr("class", "layerName")
      .text(function(d) { return d; })
      .property("value", function(d,i) { return i; })
      .property("title", function(d) { return d; })
      .on("click", function() { changeBaselayer(this); })
      .append("span")
      .attr("class", "fa fa-check pull-right activeOverlay")
      .style("visibility", function(d,i) { if(i == 1) {return "visible";} else {return "hidden";} });

  //******Initialize baselayer
  map.addLayer(googleHybrid);

  //******Function to change baselayer on select change
  function changeBaselayer(tmpDiv) {
    //***Remove old layer
    var layerDivs = d3.select("#baselayerListDropdown").selectAll("div");
      
    layerDivs._groups[0].forEach(function(tmpLayer) {
      if(d3.select(tmpLayer).select("span").style("visibility") == "visible") {
        d3.select(tmpLayer).select("span").style("visibility", "hidden");
        map.removeLayer(layerNames.baseLayers.values[d3.select(tmpLayer).property("value")]);
      }
    });

    //***Add new layer
    d3.select(tmpDiv).select("span").style("visibility", "visible");
    map.addLayer(layerNames.baseLayers.values[tmpDiv.value]);
    layerNames.baseLayers.values[tmpDiv.value].bringToBack();       
  }



  //***Overlay layers
  d3.select("#mapTools")
    .append("div")
    .attr("id", "overlaySelect")
    .attr("class", "layerList")
    .append("div")
    .attr("id", "overlayList")
    .attr("class", "cl_select")
    .property("title", "Click to select overlay layers to display on map")
    .html('<span id="overlayListHeader">View Overlay Layers</span><span class="fa fa-caret-down pull-right" style="position:relative;top:3px;"></span>')
    .on("click", function() { if(d3.select("#overlayListDropdown").style("display") == "none") {d3.select("#overlayListDropdown").style("display", "inline-block");} else {d3.select("#overlayListDropdown").style("display", "none");} });;
   d3.select("#overlaySelect")
    .append("div")
    .attr("id", "overlayListDropdown")
    .attr("class", "layerListDropdown")
    .on("mouseleave", function() { d3.select(this).style("display", "none") });

  //******Add overlay options
  d3.select("#overlayListDropdown").selectAll("div")
    .data(layerNames.overlays.keys)
    .enter()
      .append("div")
      .attr("class", "layerName")
      .text(function(d) { return d; })
      .property("value", function(d,i) { return i; })
      .property("title", function(d) { return d; })
      .property("name", function(d,i) { return overlayID[i]; })
      .on("click", function() { changeOverlay(this); })
      .append("span")
      .attr("class", "fa fa-check pull-right activeOverlay")
      .style("visibility", "hidden"); //function(d) { if(d == "US States") { map.addLayer(states); return "visible"; } else { return "hidden"; } });


  //******Function to add/remove bird layer
  function changeOverlay(tmpDiv) {
    if(d3.select(tmpDiv).select("span").style("visibility") == "hidden") {
      d3.select(tmpDiv).select("span").style("visibility", "visible");
      map.addLayer(layerNames.overlays.values[tmpDiv.value]);
      layerNames.overlays.values[tmpDiv.value].bringToFront();
      addLegendImg(tmpDiv.name, tmpDiv.title, layerNames.overlays.values[tmpDiv.value], ["overlays",tmpDiv.title]);
    } 
    else {
      d3.select(tmpDiv).select("span").style("visibility", "hidden");
      map.removeLayer(layerNames.overlays.values[tmpDiv.value]);
      remLegendImg(tmpDiv.name);
    }
  }




  //Add panel icons
  d3.select("#headerControls")
    .append("div")
    .attr("id", "panelTools");

  var hcPanels = ["info", "legend", "locate", "extent"];
  var hcGlyphs = ["fa-info", "fa-th-list", "fa-search", "fa-globe"];
  var hcLabel = ["Identify", "Legend", "Locate", "Zoom"]
  d3.select("#panelTools").selectAll("divs")
    .data(hcPanels)
    .enter()
      .append("div")
      .attr("id", function(d) { return "hc" + d.charAt(0).toUpperCase() + d.slice(1) + "Div"; })
      .attr("class", "hcPanelDivs layerList")
      .property("title", function(d,i) {
        if(d == "extent") {
          return "Click to zoom to initial extent";
        }
        else {
          return "Click to show " + hcLabel[i] + " window"; 
        }
      })
      .html(function(d,i) { if(d != "search") { return '<span class="fa ' + hcGlyphs[i] + '"></span>'; } else { return '<span class="fa ' + hcGlyphs[i] + '" data-toggle="collapse" data-target="#bingGeoLocate"></span>'; } })
      .on("click", function(d) { 
        switch (d) {
          case "info":
            toolWindowToggle(d);
            break;
          case "legend":
            toolWindowToggle(d);               
            break;
          case "extent":
            map.fitBounds([[50, -125],[23,-65]]);
            break;
          case "locate":
            toolWindowToggle(d);               
            break;
        }
      });



      //******Function to toggle tool windows
      var toggleWords = {"legend":"Legend", "info":"Identify", "locate": "Locate"}

      function toolWindowToggle(tmpDiv) {
        if (d3.select("#" + tmpDiv + "Div").style("opacity") == "1") {
          d3.select("#" + tmpDiv + "Div").transition().style("opacity", "0").style("visibility", "hidden");
          d3.select("#hc" + tmpDiv.charAt(0).toUpperCase() + tmpDiv.slice(1) + "Div").property("title", "Click to show " + toggleWords[tmpDiv] + " window");
        }
        else {
          d3.select("#" + tmpDiv + "Div").transition().duration(250).ease(d3.easeCubic).style("opacity", "1").style("display", "block").style("visibility", "visible").on("end", resizePanels);            
          d3.select("#hc" + tmpDiv.charAt(0).toUpperCase() + tmpDiv.slice(1) + "Div").property("title", "Click to hide " + toggleWords[tmpDiv] + " window");
          setZ(d3.select("#" + tmpDiv + "Div")._groups[0][0]);
        }
      }


      function setZ(tmpWin) {
        if (d3.select("#map").classed("introjs-showElement") == false) {
          d3.selectAll("#legendDiv,#infoDiv").style("z-index", function() { if(d3.select(this).style("opacity") == 1) {return 1001;} else {return 7500;} }); 
          d3.select(tmpWin).style("z-index", 1002);
        }
      }




  //******Make div for info
  d3.select("body")
    .append("div")
    .attr("class", "legend gradDown")
    .attr("id", "infoDiv");

  $('#infoDiv').draggable({containment: "html", cancel: ".toggle-group,input,textarea,button,select,option"});

  d3.select("#infoDiv")
    .append("h4")
    .text("Identify")
    .attr("class", "legTitle")
    .attr("id", "infoTitle")
    .append("span")
    .html('<span class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><u><b>Identify</b></u></p><p>Displays attribute value for visible overlay layers for a clicked point on the map</p>"</span>');
 
  d3.select("#infoTitle")
    .html(d3.select("#infoTitle").html() + '<div class="exitDiv"><span id="hideInfo" class="fa fa-times-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p>Click to hide window</p>"</span></div>'); 

  d3.select("#hideInfo")
    .on("click", function() { toolWindowToggle("info"); });

  d3.select("#infoDiv")
    .append("div")
    .attr("id", "info");


  //******Add description to info tooltip
  d3.select("#info")
    .append("p")
    .attr("id", "infoP");





  //******Make div for legend
  d3.select("body")
    .append("div")
    .attr("class", "legend gradDown")
    .attr("id", "legendDiv");

  $('#legendDiv').draggable({containment: "html", cancel: ".toggle-group,input,textarea,button,select,option"});

  d3.select("#legendDiv")
    .append("h4")
    .text("Legend")
    .attr("class", "legTitle")
    .attr("id", "legendTitle")
    .append("span")
    .html('<span class="fa fa-info-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p><u><b>Legend</b></u></p><p>Displays legends for added map layers enabling their interpretation along with control over their transparency.</p>"</span>');
 
  d3.select("#legendTitle")
    .html(d3.select("#legendTitle").html() + '<div class="exitDiv"><span id="hideLegend" class="fa fa-times-circle" data-toggle="tooltip" data-container="body" data-placement="auto" data-html="true" title="<p>Click to hide window</p>"</span></div>'); 

  d3.select("#hideLegend")
    .on("click", function() { toolWindowToggle("legend"); });

  d3.select("#legendDiv")
    .append("div")
    .attr("id", "legendDefault")
    .text("Add a map layer to view its legend...");

  d3.select("#legendDiv")
    .append("div")
    .attr("id", "legendImgDiv")
    .html('<span id="legendPrev" class="fa fa-caret-left pull-left" title="View previous legend"></span><span id="legendNext" class="fa fa-caret-right pull-right" title="View next legend"></span>');

  d3.select("#legendPrev")
    .on("click", function() { changeLegend("prev"); });

  d3.select("#legendNext")
    .on("click", function() { changeLegend("next"); });




  //******Adds images to the legend
  var legendDivs = [];   //global array of active legends

  function addLegendImg(tmpName, tmpTitle, tmpLayer, tmpPath) {
    if(tmpName.includes("surf") || tmpName.includes("mlra")) {
      var tmpOpa = 0.6;
    }
    else {
      var tmpOpa = 1;
    }
    tmpLayer.setOpacity(tmpOpa);

    legendDivs.push(tmpName);
    d3.selectAll(".layerLegend").style("display", "none");

    d3.select("#legendImgDiv")
      .append("div")
      .attr("id", tmpName + "Legend")
      .attr("value", tmpPath)
      .attr("class", "layerLegend")
      .style("margin-top", "25px").style("opacity", "0")
      .append("h3")
      .attr("class", "legendTitle")
      .text(tmpTitle);

    d3.select("#" + tmpName + "Legend")
      .append("div")
      .attr("id", tmpName + "LegImgDiv")
      .attr("class","legImgDiv")
      .append("img")
      .attr("id", tmpName + "LegendImg")
      .attr("class", "legendImg")
      .property("title", tmpTitle);

    //***Set div width and offset after the image has been loaded
    $("#" + tmpName + "LegendImg").one("load", function() {
      var tmpRect = document.getElementById(tmpName + "LegendImg").getBoundingClientRect();

      d3.select("#" + tmpName + "LegImgDiv").style({"max-height":tmpRect.height - 67 + "px", "max-width": tmpRect.width + "px"});
      //d3.select("#" + tmpName + "LegendImg").style("top", "-69px");

      d3.select("#" + tmpName + "Legend").style("opacity", "1"); 
    
      resizePanels();
    }).attr("src", "https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=30&HEIGHT=30&LAYER=ldc:" + tmpName);

    d3.select("#" + tmpName + "Legend")
      .append("input")
      .attr("type", "range").attr("name", "layer").attr("min", "0").attr("max", "100").attr("value", tmpOpa * 100)
      .attr("id", tmpName + "LegendSlider")
      .property("title", tmpTitle + " Layer Opacity: " + tmpOpa * 100 + "%")
      .on("input", function() { layerOpacity(this, tmpLayer); });

    d3.select("#" + tmpName + "Legend")
      .append("p")
      .attr("class", "legendTrans")
      .text("Transparency");

    d3.select("#legendDefault").style("display", "none");

    d3.select("#legendImgDiv")
      .style("display", "block");
        
    if(legendDivs.length > 1) {
      d3.select("#legendPrev").style("visibility", "visible");
      d3.select("#legendNext").style("visibility", "hidden");
    }

    if(d3.select("#legendDiv").style("opacity") == 0) {
      toolWindowToggle("legend");
    }
  }







  //******Removes images to the legend
  function remLegendImg(tmpName) {
    var tmpBi = 0;
    if(d3.select("#" + tmpName + "Legend").style("display") == "block") {
      tmpBi = 1;
    }

    d3.select("#" + tmpName + "Legend").remove();
    legendDivs.splice(legendDivs.indexOf(tmpName),1);

    //***If removing active legend display the first legend
    if(tmpBi == 1 && legendDivs.length > 0) {
      d3.select("#" + legendDivs[0] + "Legend").style("display", "block");
      var keys = d3.select("#" + legendDivs[0] + "Legend").attr("value").split(",");
      if(keys.length == 2) {
        layerNames[keys[0]][keys[1]].bringToFront();
      }
      else {
        layerNames[keys[0]][keys[1]][keys[2]].bringToFront();
      }
    }

    //***Set div and arrow visibility based on number of legends left
    if(legendDivs.length == 0) {
      d3.select("#legendImgDiv").style("display", "none");
      d3.select("#legendDefault").style("display", "block");
    }
    else if(legendDivs.length == 1) {
      d3.selectAll("#legendPrev,#legendNext").style("visibility", "hidden");
    }
    else if(legendDivs.length == 2) {
      if(d3.select("#" + legendDivs[0] + "Legend").style("display") == "block") {
        d3.select("#legendPrev").style("visibility", "hidden");
        d3.select("#legendNext").style("visibility", "visible");
      }
      else {
        d3.select("#legendPrev").style("visibility", "visible");
        d3.select("#legendNext").style("visibility", "hidden");
      }
    }
    else {
      var tmpLegends = d3.selectAll(".layerLegend")._group[0];
      if(d3.select(tmpLegends[0]).style("display") == "block") {
        d3.select("#legendPrev").style("visibility", "hidden");
        d3.select("#legendNext").style("visibility", "visible");
      }
      else if(d3.select(tmpLegends[tmpLegends.length - 1]).style("display") == "block") {
        d3.select("#legendPrev").style("visibility", "visible");
        d3.select("#legendNext").style("visibility", "hidden");
      }
      else {            
        d3.selectAll("#legendPrev,#legendNext").style("visibility", "visible");
      }
    } 
  }





  //******Change current legend div
  function changeLegend(tmpDir) {
        var tmpBi = 0;
        legendDivs.some(function(tmpName,i) {
          if(d3.select("#" + tmpName + "Legend").style("display") == "block") {
            tmpBi = 1;
            d3.selectAll(".layerLegend").style("display", "none");
            if(tmpDir == "prev") {
              d3.select("#" + legendDivs[i-1] + "Legend").style("display", "block");
                var keys = d3.select("#" + legendDivs[i-1] + "Legend").attr("value").split(",");
                if(keys.length == 2) {
                  layerNames[keys[0]][keys[1]].bringToFront();
                }
                else {
                  layerNames[keys[0]][keys[1]][keys[2]].bringToFront();
                }
            }
            else {
              d3.select("#" + legendDivs[i+1] + "Legend").style("display", "block");
                var keys = d3.select("#" + legendDivs[i+1] + "Legend").attr("value").split(",");
                if(keys.length == 2) {
                  layerNames[keys[0]][keys[1]].bringToFront();
                }
                else {
                  layerNames[keys[0]][keys[1]][keys[2]].bringToFront();
                }
            }
          }
          return tmpBi == 1;
        });

        tmpBi = 0;
        legendDivs.some(function(tmpName,i) {
          if(d3.select("#" + tmpName + "Legend").style("display") == "block") {
            tmpBi = 1;
            if(i == 0) {
              d3.select("#legendPrev").style("visibility", "hidden");
              d3.select("#legendNext").style("visibility", "visible");
            }
            else if(i == (legendDivs.length - 1)) {
              d3.select("#legendPrev").style("visibility", "visible");
              d3.select("#legendNext").style("visibility", "hidden");
            }
            else {
              d3.select("#legendPrev").style("visibility", "visible");
              d3.select("#legendNext").style("visibility", "visible");
            }
          }
          return tmpBi == 1;
        });              
  }


  //******Change transparency of current legend layer
  function layerOpacity(tmpSlider, tmpLayer) {
    var tmpOpacity = tmpSlider.value/100; 
    tmpSlider.title = "Opacity: " + tmpSlider.value + "%"; 
    tmpLayer.setOpacity(tmpOpacity);
  } 








  map.addEventListener("click", onMapClick);

  function onMapClick(e) {
    //console.log(e.latlng.lat.toFixed(3) + ", " + e.latlng.lng.toFixed(3));
    var i = -1;
    var tmpLayers = "";
    map.eachLayer(function(layer) { 
      i += 1;
      if(typeof layer.options.layers != "undefined") {
        if(tmpLayers == "") {
          tmpLayers = layer.options.layers;
        }
        else {
          tmpLayers = layer.options.layers + "," + tmpLayers;
        }
      }
    });

    var bbox = map.getBounds(); //.toBBoxString();
    var tmpStr = bbox._southWest.lat + "," + bbox._southWest.lng + "," + bbox._northEast.lat + "," + bbox._northEast.lng;
    var tmpWidth = map.getSize().x;
    var tmpHeight = map.getSize().y;
    var tmpI = map.layerPointToContainerPoint(e.layerPoint).x;
    var tmpJ = map.layerPointToContainerPoint(e.layerPoint).y;

    var tmpUrl = 'https://jornada-ldc2.jrn.nmsu.edu/geoserver/wms?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetFeatureInfo&LAYERS=' + tmpLayers + '&QUERY_LAYERS=' + tmpLayers + '&BBOX=' + tmpStr + '&FEATURE_COUNT=' + (i * 5) + '&HEIGHT=' + tmpHeight + '&WIDTH=' + tmpWidth + '&INFO_FORMAT=application/json&CRS=EPSG:4326&i=' + tmpI + '&j=' + tmpJ;
    //console.log(tmpUrl);

    //send the request using jQuery $.ajax
    $.ajax({
      url: tmpUrl,
      dataType: "json",
      type: "GET",
      success: function(data) {
        var tmpText = "";
        data.features.forEach(function(tmpFeat,j) {
          var tmpID = tmpFeat.id.split(".")[0];
          if(tmpID.includes("state") || tmpID.includes("county")) {
            addInfo(tmpID, tmpFeat.properties.name);
          }
          else if(tmpID.includes("surface")) {
            addInfo(tmpID, tmpFeat.properties.admin_agen + "-" + tmpFeat.properties.admin_unit);
          }
          else if(tmpID.includes("mlra")) {
            addInfo(tmpID, tmpFeat.properties.mlra_name);
          }
          else if(tmpID.includes("statsgo")) {
            addInfo(tmpID, tmpFeat.properties.mukey);
          }
          else if(tmpID.includes("wbdhu")) {
            addInfo(tmpID, tmpFeat.properties.name);
          }
          else if(tmpID == "") {
            if(tmpID == "") { tmpID = "aspect_elevation"; }
            addInfo(tmpID, Math.round(tmpFeat.properties.GRAY_INDEX));
          }
          else {
            addInfo(tmpID, "");
          }
        });
        d3.select("#infoP").text(tmpText);
        if(d3.select("#infoDiv").style("opacity") == 0) { toolWindowToggle("info"); }
        resizePanels();

        function addInfo(tmpId, tmpInfo) {
          if(tmpText == "") {
            tmpText = infoObj[tmpId] + ": " + tmpInfo;
          }
          else {
            tmpText += "\n" + infoObj[tmpId] + ": " + tmpInfo;
          }
        }
      }
    });
  }
    
}