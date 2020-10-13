var myMap = L.map("map", {
    center: [40, -99.99],
    zoom: 5
});
 
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: "pk.eyJ1IjoibWNoYW5uYWgyNyIsImEiOiJja2Zza3pzMmwwMG1yMnpwOTdwMjJlOGRjIn0.OIldkBDvG4aapC3GLbwDOQ"
}).addTo(myMap);
 
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"

d3.json(URL, function(data) {
    L.geoJSON(data, {
        pointToLayer: function (feature,latlng) {
            return L.circleMarker(latlng);
        },
        style: MarkerStyle,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place);
          }
      
    }).addTo(myMap);

    function MarkerStyle(feature) {
        return {
          opacity: 1,
          fillOpacity: 1,
          weight: 1,
          fillColor: color(feature.properties.mag),
          color: color(feature.properties.mag),
          radius: ((feature.properties.mag)*6),
        };
      }
    
    function color(mag) {
        return mag > 5 ? "#d1fbdf" :
               mag > 4 ? "#fdcc9b" :
               mag > 3 ? "#ecf6a2" :
               mag > 2 ? "#a1e7f7" :
               mag > 1 ? "#e2d1fb" :
                         "#fbf9fd" ;
        }
    
    var legend = L.control({position: 'bottomleft'});
    
    legend.onAdd = function (myMap) {
    
        var div = L.DomUtil.create('div', 'info legend');
        labels = ['\xa0\xa0\xa0\xa0\xa0'+ '<strong>Magnitudes</strong>' + "<br>"],
        magnitudes = [0,1,2,3,4,5];
    
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
            labels.push(
              "<i style='background: " + color(magnitudes[i]+1) + "'></i>" + '\xa0\xa0\xa0\xa0\xa0' +
              magnitudes[i] + (magnitudes[i + 1] ? "\xa0to\xa0" + magnitudes[i + 1] + "<br>" : "\xa0+"));
          }
      
            div.innerHTML = labels.join('<br>');

        return div;
    };
    
    legend.addTo(myMap);
});    
        
