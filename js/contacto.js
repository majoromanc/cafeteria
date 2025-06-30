// Inicializar el mapa
var map = L.map('map').setView([36.835029, -2.461694], 14); // Coordenadas de la empresa

// Cargar las capas de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 14, // Zoom máximo permitido
}).addTo(map); // Añadir la capa al mapa

// Datos de la empresa
var businessInfo = {
    name: "Barista", // Nombre de la empresa
    address: "Barista, Almería, España", // Dirección de la empresa
    phone: "622 222 222", // Teléfono de contacto de la empresa
    email: "barista@gmail.com", // Correo electrónico de la empresa
};

// Ubicación de la empresa
var businessLocation = L.latLng(36.835029, -2.461694); // Coordenadas de la empresa

// Agregar un marcador para la empresa
var businessMarker = L.marker(businessLocation).addTo(map) // Añadir un marcador en la ubicación de la empresa
    .bindPopup(`
        <strong>${businessInfo.name}</strong><br>
        Dirección: ${businessInfo.address}<br>
        Teléfono: ${businessInfo.phone}<br>
        Email: <a href="mailto:${businessInfo.email}">${businessInfo.email}</a>
    `) // Añadir un popup con la información de la empresa
    .openPopup(); // Abrir el popup al cargar el mapa

// Función para obtener la ubicación del usuario
function getUserLocation() {
    if (navigator.geolocation) { // Verificar si la geolocalización es soportada por el navegador
        navigator.geolocation.getCurrentPosition(showPosition, showError); // Obtener la posición actual del usuario
    } else {
        alert("Geolocalización no es soportada por este navegador."); // Mostrar una alerta si la geolocalización no es soportada
    }
}

// Mostrar la posición del usuario en el mapa
function showPosition(position) {
    var userLocation = L.latLng(position.coords.latitude, position.coords.longitude); // Obtener las coordenadas del usuario
    
    // Agregar un marcador para la ubicación del usuario
    L.marker(userLocation).addTo(map)
        .bindPopup('Tu Ubicación') // Añadir un popup indicando la ubicación del usuario
        .openPopup();

    // Calcular la ruta entre el negocio y la ubicación del usuario
    L.Routing.control({
        waypoints: [
            userLocation, // Ubicación del usuario
            businessLocation // Ubicación del negocio
        ],
        routeWhileDragging: true, // Permitir arrastrar la ruta mientras se calcula
        geocoder: L.Control.Geocoder.nominatim() // Usar Nominatim para geocodificación
    }).addTo(map);
}

// Manejar errores de geolocalización
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario ha denegado la solicitud de Geolocalización."); // El usuario denegó el permiso de geolocalización
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible."); // La ubicación no está disponible
            break;
        case error.TIMEOUT:
            alert("La solicitud para obtener la ubicación ha caducado."); // La solicitud de geolocalización ha caducado
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido."); // Ha ocurrido un error desconocido
            break;
    }
}

// Llamar a la función para obtener la ubicación del usuario
getUserLocation(); // Iniciar el proceso de obtención de la ubicación del usuario

// // Inicializar el mapa
var map = L.map('map').setView([36.835029, -2.461694], 13); // Coordenadas de la empresa

// Cargar las capas de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, // Zoom máximo permitido
}).addTo(map); // Añadir la capa al mapa

// Datos de la empresa
var businessInfo = {
    name: "Barista", // Nombre de la empresa
    address: "Barista, Almería, España", // Dirección de la empresa
    phone: "622 222 222", // Teléfono de contacto de la empresa
    email: "barista@gmail.com", // Correo electrónico de la empresa
};

// Ubicación de la empresa
var businessLocation = L.latLng(36.835029, -2.461694); // Coordenadas de la empresa

// Agregar un marcador para la empresa
var businessMarker = L.marker(businessLocation).addTo(map) // Añadir un marcador en la ubicación de la empresa
    .bindPopup(`
        <strong>${businessInfo.name}</strong><br>
        Dirección: ${businessInfo.address}<br>
        Teléfono: ${businessInfo.phone}<br>
        Email: <a href="mailto:${businessInfo.email}">${businessInfo.email}</a>
    `) // Añadir un popup con la información de la empresa
    .openPopup(); // Abrir el popup al cargar el mapa

// Función para obtener la ubicación del usuario
function getUserLocation() {
    if (navigator.geolocation) { // Verificar si la geolocalización es soportada por el navegador
        navigator.geolocation.getCurrentPosition(showPosition, showError); // Obtener la posición actual del usuario
    } else {
        alert("Geolocalización no es soportada por este navegador."); // Mostrar una alerta si la geolocalización no es soportada
    }
}

// Mostrar la posición del usuario en el mapa
function showPosition(position) {
    var userLocation = L.latLng(position.coords.latitude, position.coords.longitude); // Obtener las coordenadas del usuario
    
    // Agregar un marcador para la ubicación del usuario
    L.marker(userLocation).addTo(map)
        .bindPopup('Tu Ubicación') // Añadir un popup indicando la ubicación del usuario
        .openPopup();

    // Calcular la ruta entre el negocio y la ubicación del usuario
    L.Routing.control({
        waypoints: [
            userLocation, // Ubicación del usuario
            businessLocation // Ubicación del negocio
        ],
        routeWhileDragging: true, // Permitir arrastrar la ruta mientras se calcula
        geocoder: L.Control.Geocoder.nominatim() // Usar Nominatim para geocodificación
    }).addTo(map);
}

// Manejar errores de geolocalización
function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("El usuario ha denegado la solicitud de Geolocalización."); // El usuario denegó el permiso de geolocalización
            break;
        case error.POSITION_UNAVAILABLE:
            alert("La ubicación no está disponible."); // La ubicación no está disponible
            break;
        case error.TIMEOUT:
            alert("La solicitud para obtener la ubicación ha caducado."); // La solicitud de geolocalización ha caducado
            break;
        case error.UNKNOWN_ERROR:
            alert("Ha ocurrido un error desconocido."); // Ha ocurrido un error desconocido
            break;
    }
}

// Llamar a la función para obtener la ubicación del usuario
getUserLocation(); // Iniciar el proceso de obtención de la ubicación del usuario