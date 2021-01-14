//Récupération des données de la base
const mapDiv = document.querySelector('#map');
const farmer = JSON.parse(mapDiv.dataset.farmer);

//Configuration  de l'API mapBox
const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapboxToken = 'pk.eyJ1IjoidGhvY2xlODYiLCJhIjoiY2tqdmtwdXFoMDV2NjJ1bWxkZG5zOHBsdCJ9.8owfFU7n_mytVoybDByojw';

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

//Test pour récupérer plusieurs villes et les mettre dans un groupe
//Cela permet de cocher et décocher leur affichage dans la vue
let littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
let denver = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
let aurora = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
let golden = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

let cities = L.layerGroup([littleton, denver, aurora, golden]);

//Création de la carte
let map = L.map('map',
    {
        center: [48.474968, 1.5363024], //centrage de la vue sur comparateur agricole à l'ouverture de la carte
        zoom: 10,
        layers: [mapDefault, cities]
    }
);

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
    "NIGHT": mapNight
};

//Objet avec les différentes villes sélectionnables dans la vue
let overlayMaps = {
    "Cities": cities
};

//Création du panel de sélection des calques et des villes ou autres
L.control.layers(baseMaps, overlayMaps).addTo(map);


//Pointeur sur le farmer envoyé dans la vue
/*
L.marker([farmer[1], farmer[2]]).addTo(map)
    .bindPopup(farmer[0])
    .openPopup();
*/

/**
 * Fonction de localisation
 */
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
