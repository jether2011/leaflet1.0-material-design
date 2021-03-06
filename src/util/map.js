$( document ).ready(function(){  
    initMap();
});

 /**
 * Links úteis:
 * - https://leaflet-extras.github.io/leaflet-providers/preview/
 */
function initMap(){    

    map = L.map('terrabrasillis-map', {scrollWheelZoom:false}).setView([-11.678782,-52.685277], 5);

    // baselayers
    var openstreetmap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
        maxZoom: 18,
        minZoom: 4
    });

    var openStreetMapBlackAndWhite = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,        
        minZoom: 4
    });

    var empty = L.tileLayer('');
    
    var baseLayers = {
        'Blank': empty,
        'OSM' : openstreetmap,
        'OSM_Black' : openStreetMapBlackAndWhite
    }

    // define the openstreetmap as main map layer    
    baseLayers.OSM_Black.addTo(map);

    // overlayers
    var forest_2016 = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:forest_2016',
        format: 'image/png',
        transparent: true
    });

    var forest_2017 = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:forest_2017',
        format: 'image/png',
        transparent: true
    });

    var deforestation = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:yearly_deforestation_2013_2017',
        format: 'image/png',
        transparent: true
    });

    var deforestation19882012 = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:accumulated_deforestation_1988_2012',
        format: 'image/png',
        transparent: true
    });

    var hydrography = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:hydrography',
        format: 'image/png',
        transparent: true
    });

    var noForest = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:no_forest',
        format: 'image/png',
        transparent: true
    });

    var cloud2016 = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:cloud_2016',
        format: 'image/png',
        transparent: true
    });

    var cloud2017 = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:cloud_2017',
        format: 'image/png',
        transparent: true
    });

    var amazon_legal_limit = L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:brazilian_legal_amazon',
        format: 'image/png',
        transparent: true
    });

    var overlayersGroup = L.layerGroup([forest_2016, deforestation, deforestation19882012, amazon_legal_limit]);
     
    var overLayers = {
        'Products' : overlayersGroup,
        'Hydrography' : hydrography,
        'No Forest' : noForest,        
        'Cloud 2016' : cloud2016,
        'Cloud 2017' : cloud2017,
        'Forest 2016' : forest_2016,
        'Forest 2017 (Parcial 95 cenas)': forest_2017,
        'Deforestation' : deforestation,
        'Deforestation 1988_2012' : deforestation19882012,
        'Legal Amazon': amazon_legal_limit
    }

    // define a layer to be the actived layer    
    overLayers.Products.addTo(map);

    // general
    var options = {
        sortLayers : true,
        collapsed : true
    }

    L.control.layers(baseLayers, overLayers, options).addTo(map);

    L.control.scale().addTo(map);


    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }

    map.on('contextmenu', function(e) {
        var dialog = document.querySelector('#dialog');

        content.innerText = e.latlng;
        dialog.showModal();

        dialog.querySelector('button:not([disabled])').addEventListener('click', function() {
          dialog.close();
        });
    });
}