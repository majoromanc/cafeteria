// Coordenadas del negocio
    const negocioCoords = [36.8401, -2.4675]; // Ejemplo: Almería

    const map = L.map('map').setView(negocioCoords, 14);

    // Capa base: OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Marcador con los datos del negocio
    const popupNegocio = `
      <strong>📍Barista</strong><br>
      🏢 Plaza de la Constitución, Almería<br>
      ☎️  622 222 222 <br>
      ✉️ <a href="mailto:Barista@gmail.com">Barista@gmail.com</a>
    `;

    L.marker(negocioCoords).addTo(map).bindPopup(popupNegocio).openPopup(); 

    // Geolocalización del cliente
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        const clienteCoords = [pos.coords.latitude, pos.coords.longitude];

        // Marcador del cliente
        L.marker(clienteCoords).addTo(map).bindPopup('🧍 Tu ubicación');

        // Ruta real con calles
        L.Routing.control({
          waypoints: [
            L.latLng(clienteCoords[0], clienteCoords[1]),
            L.latLng(negocioCoords[0], negocioCoords[1])
          ],
          routeWhileDragging: false,
          language: 'es',
          showAlternatives: false
        }).addTo(map);
      }, function(error) {
        alert('⚠️ No se pudo obtener tu ubicación. Verifica los permisos del navegador.');
      });
    } else {
      alert('⚠️ Tu navegador no admite geolocalización.');
    }
