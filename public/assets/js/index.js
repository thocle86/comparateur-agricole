const mapDiv = document.querySelector('#map');
const departments = JSON.parse(mapDiv.dataset.departments);

/***Configuration  de l'API mapBox___start***/
const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapboxToken = 'pk.eyJ1IjoidGhvY2xlODYiLCJhIjoiY2tqdmtwdXFoMDV2NjJ1bWxkZG5zOHBsdCJ9.8owfFU7n_mytVoybDByojw';
/***Configuration  de l'API mapBox___end***/

/***Configuration des calques___start***/
//Calque par défaut
let mapDefault = L.tileLayer(mapboxUrl,
    {
        attribution: mapboxAttribution,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken,
    }
);

//Calque outdoors
let mapOutdoors = L.tileLayer(mapboxUrl,
    {
        attribution: mapboxAttribution,
        maxZoom: 18,
        id: 'mapbox/outdoors-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken,
    }
);

//Calque satellite
let mapSatellite = L.tileLayer(mapboxUrl,
    {
        attribution: mapboxAttribution,
        maxZoom: 18,
        id: 'mapbox/satellite-streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken,
    }
);

//Calque night
let mapNight = L.tileLayer(mapboxUrl,
    {
        attribution: mapboxAttribution,
        maxZoom: 18,
        id: 'mapbox/navigation-guidance-night-v4',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken,
    }
);

//Calque blanc
let mapWhite = L.tileLayer(mapboxUrl,
    {
        attribution: mapboxAttribution,
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapboxToken,
    }
);

/***Configuration des calques___end***/

//Création de la carte
let map = L.map('map',
    {
        center: [48.474968, 1.5363024], //centrage de la vue sur comparateur agricole à l'ouverture de la carte
        zoom: 10,
        layers: [mapDefault]
    }
);

//Ajout des données GeoJson à la carte pour avoir les contours de département
L.geoJson(geojsonFrance).addTo(map);

//Tableau des couleurs
var grades = {
    "grade1" : '#2D4A25', // 2 nuances au-dessus
    "grade2" : '#446F37', // 2 nuances au-dessus
    "grade3" : '#5A9449', // --primary color
    "grade4" : '#83AF77', // 2 teintes en-dessous
    "grade5" : '#ACCAA4', // 2 teintes en-dessous
};

//Fonction pour récupérer le nombre d'inscrits avec le code postal des données GeoJson
let numberCustomers;
function getGradesCustomers(code) {
    for (const index in departments) {
        if (code == index) {
            numberCustomers = departments[index];
        }
    }
    return getGrades(numberCustomers);
}

//Fonction pour attribuer une couleur en fonction du nombre d'inscrits
function getGrades(number) {
    return  number > 200 ? grades["grade1"] :
            number > 150 ? grades["grade2"] :
            number > 100 ? grades["grade3"] :
            number > 50  ? grades["grade4"] :
            grades["grade5"];
}

//
function getDepartment(feature) {
    $thisDepartment = feature.properties.code;
}

//Fonction pour appliquer un style aux départements
function style(feature) {
    return {
        fillColor: getGradesCustomers(feature.properties.code),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.6
    };
}

//Fonction pour appliquer un effet hover à un departement
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#e9b537',
        dashArray: '',
        fillOpacity: 0.6
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

//Fonction pour réinitialiser le style lorsqu'on n'est plus sur le département
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

//Fonction pour faire un zoom lorsqu'on clique sur un département
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(geojsonFrance, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);


let info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

info.update = function (props) {
    let numberCustomers;
    for (let prop in props) {
        /*console.log(`props.${prop} = ${props[prop]}`);*/
        for (const index in departments) {
            if (props.code == index) {
                numberCustomers = departments[index];
            }
        }
    }

    this._div.innerHTML = '<h4>Nombre d\'inscrits</h4>' +  (props ?
        '<b>' + props.code + ' - ' + props.nom +'</b><br />' + numberCustomers + ' inscrits à ce jour'
        : 'Passer ou cliquer sur un département');
};

info.addTo(map);

let legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend'),
        grades = [200, 150, 100, 50, 0],
        labels = [];

    
    div.innerHTML +=
        '<i style="background:' + getGrades(grades[0] + 1) + '"></i> ' + grades[0] + '+ <br>';
    for (let i = 0; i < grades.length-1; i++) {
        div.innerHTML +=
            '<i style="background:' + getGrades(grades[i] - 1) + '"></i> ' +
            grades[i] + '&ndash;' + grades[i + 1] + '<br>';
    }

    return div;
};

legend.addTo(map);



//Pointeur sur comparateur agricole
L.marker([48.4474968, 1.5363024]).addTo(map)
    .bindPopup('Comparateur<br>Agricole.com')
    .openPopup();

//Fonction pour recentrer sur comparateur agricole
comparateurAgricole.addEventListener('click', function() {
    map.setView([48.4474968, 1.5363024], 10);
});

//Objet avec les différents calques sélectionnables dans la vue
let baseMaps = {
    "DEFAUT": mapDefault,
    "OUTDOORS": mapOutdoors,
    "SATELLITE": mapSatellite,
    "NIGHT": mapNight,
    "Chroma": mapWhite
};

//Création du panel de sélection des calques et des villes ou autres
L.control.layers(baseMaps, overlayMaps).addTo(map);

/***Fonction de localisation___start***/
myLocate.addEventListener('click', function() {
    map.locate({setView: true, maxZoom: 16});

    function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng).addTo(map)
            .bindPopup("Vous êtes dans un rayon de " + radius + " m de ce point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }
    map.on('locationfound', onLocationFound);

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationerror', onLocationError);
});
/***Fonction de localisation___end***/
