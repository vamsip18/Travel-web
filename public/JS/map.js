
var map = L.map('map').setView(coordinates, 13); // Coordinates: [lat, lon]
            
                    // Add OpenStreetMap tile layer (FREE)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
            
                    // Add a marker
L.marker(coordinates).addTo(map)
// .bindPopup('Hello! This is your location.')
.openPopup()
// .bindPopup("Exact Location wiil be provided after booking").on('click', function (e) {
//     this.openPopup();
// })

// Add a tooltip (popup on **hover**)
.bindTooltip("Exact Location wiil be provided after booking").openTooltip();