const socket = io();
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("send-location", {
            lat: latitude,
            long: longitude
        });
        // map.setView([latitude, longitude], 13);
        // L.marker([latitude, longitude]).addTo(map);
    });
}
const map = L.map("map").setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "Awadhpuri"
}).addTo(map);

const markers = {};

socket.on("recieve-location", (data) => {
    const { id, lat, long } = data;
    map.setView([lat, long], 16);
    if(markers[id]){
        markers[id].setLatLng([lat, long]);
    }else{
        markers[id] = L.marker([lat, long]).addTo(map);
    }
})

socket.on("diss",(id)=>{
    if(markers[id]){
        map.removeLayer(markers[id]);
        delete markers[id];
    }
})
