// main.js

/**
 * Muestra una sección específica y oculta todas las demás.
 * @param {string} sectionId El ID de la sección HTML a mostrar (ej. 'home-section').
 */
function showSection(sectionId) {
    // Obtiene todas las secciones que tienen la clase 'screen'
    const sections = document.querySelectorAll('.screen');

    // Itera sobre todas las secciones y las oculta (remueve la clase 'active')
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Muestra la sección deseada añadiendo la clase 'active'
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
    }
}

// Event Listeners para los botones de navegación inicial
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-soy-alumno').addEventListener('click', () => {
        showSection('alumno-section');
    });

    document.getElementById('btn-soy-profesor').addEventListener('click', () => {
        showSection('profesor-section');
        // Cuando se va a la sección del profesor, renderizamos la lista de alumnos
        renderAlumnosList();
    });

    // Botones de regresar a Home
    document.getElementById('back-to-home-from-alumno').addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir recarga de página
        showSection('home-section');
        // Opcional: limpiar el contenedor de profesores cuando se regresa
        document.getElementById('profesores-list-container').innerHTML = '';
        document.getElementById('materia-selector').value = ''; // Resetear el selector
    });

    document.getElementById('back-to-home-from-profesor').addEventListener('click', (e) => {
        e.preventDefault(); // Prevenir recarga de página
        showSection('home-section');
        // Opcional: limpiar el input de archivo cuando se regresa
        document.getElementById('material-file-input').value = '';
    });
});
// En alumno.js

document.addEventListener('DOMContentLoaded', () => {
    const btnBuscarProfesores = document.getElementById('btn-buscar-profesores');
    const btnBuscarMasProfesores = document.getElementById('btn-buscar-mas-profesores');
    const profesoresListContainer = document.getElementById('profesores-list-container');

    if (btnBuscarProfesores) {
        btnBuscarProfesores.addEventListener('click', () => {
            // Lógica para "Buscar profesores"
            // Aquí iría el código real para filtrar/cargar profesores
            // Por ahora, solo simulará que se encontraron profesores y los mostrará en el contenedor.
            console.log('Botón "Buscar profesores" presionado. Simula búsqueda en esta misma página.');

            if (profesoresListContainer) {
                profesoresListContainer.style.display = 'block'; // Muestra el contenedor de la lista
            }
            // Puedes añadir más lógica aquí para poblar 'profesores-list-container' con los resultados.
        });
    }

    if (btnBuscarMasProfesores) {
        btnBuscarMasProfesores.addEventListener('click', () => {
            // Lógica para "Buscar más profesores"
            // Este es el botón que redirige a index (2).html
            console.log('Botón "Buscar más profesores" presionado. Redirigiendo a index (2).html.');
            window.location.href = 'index (2).html';
        });
    }

    // Lógica para los selectores de Nivel y Materia (si ya la tienes en alumno.js, no la dupliques)
    const nivelSelector = document.getElementById('nivel-selector');
    const materiaSelector = document.getElementById('materia-selector');

    if (nivelSelector && materiaSelector) {
        nivelSelector.addEventListener('change', () => {
            if (nivelSelector.value) {
                materiaSelector.disabled = false;
                // Aquí podrías popular las opciones de materia basadas en el nivel seleccionado
                materiaSelector.innerHTML = '<option value="">-- Elige una materia --</option>';
                if (nivelSelector.value === 'Primaria') {
                    materiaSelector.innerHTML += '<option value="matematica">Matemática</option><option value="comunicacion">Comunicación</option>';
                } else if (nivelSelector.value === 'Secundaria') {
                    materiaSelector.innerHTML += '<option value="matematica">Matemática</option><option value="fisica">Física</option><option value="quimica">Química</option>';
                } else if (nivelSelector.value === 'Universidad') {
                    materiaSelector.innerHTML += '<option value="calculo">Cálculo</option><option value="programacion">Programación</option>';
                }
            } else {
                materiaSelector.disabled = true;
                materiaSelector.innerHTML = '<option value="">-- Elige una materia --</option>';
            }
        });
    }
});