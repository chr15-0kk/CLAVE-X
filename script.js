async function enviarAlerta() {
  if (!navigator.geolocation) {
    alert("⚠️ Geolocalización no está disponible en tu navegador.");
    return;
  }

  const confirmar = confirm("¿Estás seguro que quieres enviar una alerta de emergencia? Úsalo solo en casos reales.");
  if (!confirmar) return;

  navigator.geolocation.getCurrentPosition(async pos => {
    const alerta = {
      tipo: "Emergencia",
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      fecha: new Date().toISOString()
    };

    try {
      await firebase.database().ref("alertas").push(alerta);
      alert("🚨 Alerta enviada con éxito. ¡Mantente seguro!");
    } catch (error) {
      alert("❌ Error al enviar la alerta: " + error.message);
    }
  }, error => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("Permiso de ubicación denegado. No se puede enviar alerta.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Información de ubicación no disponible.");
        break;
      case error.TIMEOUT:
        alert("Tiempo de espera agotado para obtener ubicación.");
        break;
      default:
        alert("Error desconocido al obtener ubicación.");
        break;
    }
  }, {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  });
}

async function mostrarFormulario(tipo) {
  let detalle = prompt(`Describe con detalle el incidente de tipo "${tipo}": (mínimo 10 caracteres)`);
  if (!detalle) {
    alert("No se escribió ninguna descripción. Denuncia cancelada.");
    return;
  }
  detalle = detalle.trim();
  if (detalle.length < 10) {
    alert("Por favor, describe el incidente con al menos 10 caracteres.");
    return;
  }

  const confirmar = confirm(`¿Confirmas que quieres enviar la denuncia de tipo "${tipo}"?`);
  if (!confirmar) return;

  const alerta = {
    tipo,
    detalle,
    fecha: new Date().toISOString()
  };

  try {
    await firebase.database().ref("alertas").push(alerta);
    alert("✅ Denuncia enviada correctamente. Gracias por reportar.");
  } catch (error) {
    alert("❌ Error al enviar la denuncia: " + error.message);
  }
}
