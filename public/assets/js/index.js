//Configuration  de l'API mapBox
const mapboxUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
const mapboxAttribution = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const mapboxToken = 'pk.eyJ1IjoidGhvY2xlODYiLCJhIjoiY2tqdmtwdXFoMDV2NjJ1bWxkZG5zOHBsdCJ9.8owfFU7n_mytVoybDByojw';

const departmentsLayer = new L.layerGroup();
const farmersLayer = new L.layerGroup();

//comparateur agricole icon settings
var comparateurAgricoleIcon = L.icon({
    iconUrl: '/assets/images/comparateur_agricole_icon.png',
    iconSize: [34, 45],});

//departments icon settings
var departmentIcon = L.icon({
    iconUrl: '/assets/images/farm_icon.png',
    iconSize: [38, 38],});

//farmers icon settings
var farmersIcon = L.icon({
    iconUrl: '/assets/images/farmer_icon.png',
    iconSize: [38, 38],});

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
        zoom: 6,
        layers: [mapDefault, cities]
    }
);

map.on('zoomend', function(ev){
    const mapDiv = document.querySelector('#map');
    const departments = JSON.parse(mapDiv.dataset.departments);
    
    if (map.getZoom() > 8.5 && !map.hasLayer(farmersLayer)) {
        map.removeLayer(departmentsLayer);
        farmersLayer.addTo(map);

            /*fetch('/farmers')
                .then(res => res.json())
                .then(data => {
                    for (let i = 0; i < data.length; i++) {
                        L.marker([data[i][1], data[i][2]], {icon: farmersIcon}).addTo(farmersLayer)
                        .bindPopup(data[i][0]);
                    }
                })
                .catch(err => { throw err });*/
    } else if (map.getZoom() > 6.5 && !map.hasLayer(departmentsLayer)) {
        map.removeLayer(farmersLayer);
        departmentsLayer.addTo(map);

        for (const index in departments) {
            fetch('https://geo.api.gouv.fr/communes?codePostal='+index+'000&fields=code,nom,centre,departement')
                .then(res => res.json())
                .then(data => {L.marker([data[0].centre.coordinates[1], data[0].centre.coordinates[0]], {icon: departmentIcon}).addTo(departmentsLayer)
                    .bindPopup(departments[index]+' agriculteurs nous font déjà confiance en '+data[0].departement.nom+' !');})
                .catch(err => { throw err });
        }
    } else if (map.getZoom() <= 6) {
        map.removeLayer(departmentsLayer);
    }
});

//Pointeur sur comparateur agricole
L.marker([48.4474968, 1.5363024], {icon: comparateurAgricoleIcon}).addTo(map)
    .bindPopup('Comparateur<br>Agricole.com');

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
