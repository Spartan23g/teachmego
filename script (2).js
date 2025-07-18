    // Mostrar formulario al hacer clic en botón
    document.getElementById('register-alumno-btn').onclick = () => {
      document.getElementById('welcome-screen').classList.remove('active');
      document.getElementById('alumno-register-form').classList.add('active');
    };

    // Volver al inicio
    document.getElementById('back-to-welcome-alumno').onclick = () => {
      document.getElementById('alumno-register-form').classList.remove('active');
      document.getElementById('welcome-screen').classList.add('active');
    };