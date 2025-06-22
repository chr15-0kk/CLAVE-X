// Conexión a Firebase
const database = firebase.database();
const alertasRef = database.ref("alertas");

// Enviar alerta general
function enviarAlerta() {
  const fecha = Date.now();
  const alerta = {
    tipo: "General",
    detalle: "Alerta directa enviada",
    fecha: fecha
  };
  alertasRef.push(alerta);
  alert("🚨 ¡Alerta enviada exitosamente!");
}

// Mostrar formulario simulado de denuncia
function mostrarFormulario(tipo) {
  const detalle = prompt(`Describe brevemente la situación de ${tipo.toLowerCase()}:`);
  if (!detalle) {
    alert("⚠️ Se requiere una descripción para registrar la alerta.");
    return;
  }

  // Registrar alerta con detalles
  const alerta = {
    tipo: tipo,
    detalle: detalle,
    fecha: Date.now()
  };

  // Intentar obtener ubicación
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alerta.lat = position.coords.latitude;
        alerta.lng = position.coords.longitude;
        alertasRef.push(alerta);
        alert("📍 Alerta registrada con ubicación.");
      },
      () => {
        alertasRef.push(alerta);
        alert("📍 Alerta registrada sin ubicación.");
      }
    );
  } else {
    alertasRef.push(alerta);
    alert("⚠️ Navegador no soporta geolocalización.");
  }
}
