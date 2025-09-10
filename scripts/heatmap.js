document.addEventListener("DOMContentLoaded", function() {
    // Single map instance, centered on Europe
    var map = L.map('map').setView([50.8503, 10.3512], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Heatmap layer
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
        [57.0488, 9.9217, 0.6],
        // Denmark
        [56.1629, 10.2039, 1.0], // Aarhus
        [56.1629, 10.2039, 0.8],
        [56.1629, 10.2039, 0.6]
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

    // Cities to fetch GitHub user count for
    const cities = [
        {name: "Bucharest", coords: [44.4268, 26.1025]},
        {name: "Berlin", coords: [52.5200, 13.4050]},
        {name: "Paris", coords: [48.8566, 2.3522]},
        {name: "Copenhagen", coords: [55.6761, 12.5683]},
        {name: "Aarhus", coords: [56.1629, 10.2039]},
        {name: "London", coords: [51.5074, -0.1278]},
        {name: "Amsterdam", coords: [52.3676, 4.9041]},
        {name: "Brussels", coords: [50.8503, 4.3517]},
        {name: "Vienna", coords: [48.2082, 16.3738]},
        {name: "Zurich", coords: [47.3769, 8.5417]},
        {name: "Warsaw", coords: [52.2297, 21.0122]},
    ];

    cities.forEach(city => {
        fetch(`https://api.github.com/search/users?q=location:${encodeURIComponent(city.name)}`)
            .then(response => response.json())
            .then(data => {
                const count = data.total_count;
                L.marker(city.coords)
                    .addTo(map)
                    .bindPopup(`${city.name}: ${count} GitHub accounts`);
            })
            .catch(err => {
                console.error(`Error fetching GitHub user count for ${city.name}:`, err);
            });
    });

    // Custom number markers (optional, can be removed if not needed)
    /*
    var citiesWithNumbers = [
        {lat: 44.4268, lng: 26.1025, name: "Bucharest", number: Math.floor(Math.random() * 100)},
        {lat: 52.5200, lng: 13.4050, name: "Berlin", number: Math.floor(Math.random() * 100)},
        {lat: 48.8566, lng: 2.3522, name: "Paris", number: Math.floor(Math.random() * 100)},
        {lat: 55.6761, lng: 12.5683, name: "Copenhagen", number: Math.floor(Math.random() * 100)}
    ];

    citiesWithNumbers.forEach(function(city) {
        var icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color:#ffcc00;border-radius:50%;padding:10px;">${city.number}</div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });
        L.marker([city.lat, city.lng], {icon: icon}).addTo(map).bindPopup(city.name);
    });
    */
});
