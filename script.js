function enviarAlerta() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const alerta = {
        tipo: "Emergencia",
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        fecha: new Date().toISOString()
      };
      firebase.database().ref("alertas").push(alerta);
      alert("🚨 Alerta enviada.");
    });
  } else {
    alert("Geolocalización no disponible.");
  }
}

function mostrarFormulario(tipo) {
  const detalle = prompt(`Describe el incidente de tipo "${tipo}"`);
  if (detalle) {
    firebase.database().ref("alertas").push({
      tipo,
      detalle,
      fecha: new Date().toISOString()
    });
    alert("Denuncia enviada.");
  }
}
