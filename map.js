$( document ).ready(function(){   
    initMap();
});

function initMap(){    

    map = L.map('terrabrasillis-map').setView([-5.0389036,-55.6218959], 6);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
         attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
         maxZoom: 18,
         minZoom: 4
    }).addTo(map);

    L.tileLayer.wms("http://terrabrasilis.info/fip-service/gwc/service/wms", {
        layers: 'fip-project-prodes:forest_2016',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    // define map layers
    // var layers = {
    //   Streets: L.mapbox.tileLayer('mapbox.streets'),
    //   Outdoors: L.mapbox.tileLayer('mapbox.outdoors'),
    //   Satellite: L.mapbox.tileLayer('mapbox.satellite')
    // };

    // define map overlays
    // var overlays = {
    //   'Bike Stations': L.mapbox.tileLayer('examples.bike-locations'),
    //   'Bike Lanes': L.mapbox.tileLayer('examples.bike-lanes')
    // }

    //layers.Streets.addTo(map);

}