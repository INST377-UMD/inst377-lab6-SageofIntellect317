const map = L.map('map').setView([37.0902, -95.7129], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const coordinates = [
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) },
    { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-100, -90, 3) }
];

async function fetchLocality(lat, lng, markerId) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`;
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById(markerId).textContent = data.locality || 'No locality found';
}

coordinates.forEach((coord, index) => {
    L.marker([coord.lat, coord.lng]).addTo(map);
    document.getElementById(`marker${index + 1}-coord`).textContent = `${coord.lat}, ${coord.lng}`;
    fetchLocality(coord.lat, coord.lng, `marker${index + 1}-locality`);
});
