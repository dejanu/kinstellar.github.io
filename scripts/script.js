// Initialize map
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

// Load data
Promise.all([
  fetch('world.geojson').then(r => r.json()),
  fetch('data.json').then(r => r.json())
]).then(([geoData, stats]) => {
  
  // Choropleth for countries
  function getColor(d) {
    return d > 1000000 ? '#800026' :
           d > 500000  ? '#BD0026' :
           d > 100000  ? '#E31A1C' :
           d > 50000   ? '#FC4E2A' :
           d > 10000   ? '#FD8D3C' :
           d > 1000    ? '#FEB24C' :
                         '#FFEDA0';
  }

  function style(feature) {
    const countryCode = feature.properties.ISO_A2;
    const value = stats.countries[countryCode] || 0;
    return {
      fillColor: getColor(value),
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    };
  }

  const countryLayer = L.geoJson(geoData, {
    style: style,
    onEachFeature: (feature, layer) => {
      const code = feature.properties.ISO_A2;
      const count = stats.countries[code] || 0;
      layer.bindPopup(`<b>${feature.properties.ADMIN}</b><br/>Accounts: ${count}`);
    }
  }).addTo(map);

  // City markers
  const cityLayer = L.layerGroup();
  stats.cities.forEach(city => {
    const circle = L.circleMarker([city.lat, city.lon], {
      radius: Math.sqrt(city.count) / 50, // size by count
      fillColor: "#0074D9",
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7
    }).bindPopup(`<b>${city.name}</b><br/>Accounts: ${city.count}`);
    cityLayer.addLayer(circle);
  });

  // Show cities only when zoomed in
  map.on('zoomend', () => {
    if (map.getZoom() > 4) {
      if (!map.hasLayer(cityLayer)) {
        map.removeLayer(countryLayer);
        map.addLayer(cityLayer);
      }
    } else {
      if (!map.hasLayer(countryLayer)) {
        map.removeLayer(cityLayer);
        map.addLayer(countryLayer);
      }
    }
  });
});
