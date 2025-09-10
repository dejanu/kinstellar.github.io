// Initialize the map
const map = L.map('map').setView([44.4268, 26.1025], 6); // Centered on Bucharest
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
}).addTo(map);

const countries = ["Bucharest","Berlin", "Paris", "Copenhagen"];
// Fetch GitHub user count for each country/city in countries array and display on map
countries.forEach(city => {
    fetch(`https://api.github.com/search/users?q=location:${encodeURIComponent(city)}`)
        .then(response => response.json())
        .then(data => {
            const count = data.total_count;
            // Define coordinates for each city
            let coords;
            switch (city) {
                case "Bucharest":
                    coords = [44.4268, 26.1025];
                    break;
                case "Berlin":
                    coords = [52.5200, 13.4050];
                    break;
                case "Paris":
                    coords = [48.8566, 2.3522];
                    break;
                case "Copenhagen":
                    coords = [55.6761, 12.5683];
                    break;
                default:
                    coords = null;
            }
            if (coords) {
                L.marker(coords)
                    .addTo(map)
                    .bindPopup(`${city}: ${count} GitHub accounts`);
            }
        })
        .catch(err => {
            console.error(`Error fetching GitHub user count for ${city}:`, err);
        });
});
document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([50.8503, 10.3512], 5); // Centered on Europe

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var heat = L.heatLayer([
        // Romania
        [44.4268, 26.1025, 1.0], // Bucharest
        [44.4368, 26.1125, 0.8],
        [44.4468, 26.1225, 0.6],
        // Germany
        [52.5200, 13.4050, 1.0], // Berlin
        [48.1351, 11.5820, 0.8],
        [50.1109, 8.6821, 0.6],
        // France
        [48.8566, 2.3522, 1.0], // Paris
        [45.7640, 4.8357, 0.8],
        [43.7102, 7.2620, 0.6],
        // Denmark
        [55.6761, 12.5683, 1.0], // Copenhagen
        [55.4038, 10.4024, 0.8],
        [57.0488, 9.9217, 0.6]
    ], {
        radius: 25,
        max: 1.0,
        gradient: {
            0.4: 'blue',
            0.6: 'lime',
            0.8: 'yellow',
            1.0: 'red'
        }
    }).addTo(map);

    var cities = [
        {lat: 44.4268, lng: 26.1025, name: "Bucharest", number: Math.floor(Math.random() * 100)},
        {lat: 52.5200, lng: 13.4050, name: "Berlin", number: Math.floor(Math.random() * 100)},
        {lat: 48.8566, lng: 2.3522, name: "Paris", number: Math.floor(Math.random() * 100)},
        {lat: 55.6761, lng: 12.5683, name: "Copenhagen", number: Math.floor(Math.random() * 100)}
    ];

    cities.forEach(function(city) {
        var icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color:#ffcc00;border-radius:50%;padding:10px;">${city.number}</div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        L.marker([city.lat, city.lng], {icon: icon}).addTo(map).bindPopup(city.name);
    });
});
