// alumno.js

// Array de profesores simulados
// Cada profesor puede enseñar múltiples materias y en diferentes niveles
const profesores = [
    {
        id: 1,
        nombre: "Dr. Ricardo Pérez",
        materias: [
            { nivel: "Primaria", nombre: "Matemáticas Básicas" },
            { nivel: "Secundaria", nombre: "Álgebra" },
            { nivel: "Universidad", nombre: "Cálculo I" }
        ],
        precio: 30, // en Soles (S/)
        calificacion: 4.8,
        bio: "Especialista en cálculo y álgebra. Más de 10 años de experiencia.",
        img: "https://randomuser.me/api/portraits/men/80.jpg",
        otrosCursos: ["Geometría", "Física Básica"],
        alumnosACargo: 15
    },
    {
        id: 2,
        nombre: "Lic. Sofía González",
        materias: [
            { nivel: "Secundaria", nombre: "Física" },
            { nivel: "Universidad", nombre: "Mecánica Cuántica" }
        ],
        precio: 35, // en Soles (S/)
        calificacion: 4.9,
        bio: "Apasionada por la física, ayuda a entender conceptos complejos.",
        img: "https://randomuser.me/api/portraits/women/81.jpg",
        otrosCursos: ["Química", "Astronomía"],
        alumnosACargo: 12
    },
    {
        id: 3,
        nombre: "Mtra. Laura Díaz",
        materias: [
            { nivel: "Primaria", nombre: "Comunicación" },
            { nivel: "Secundaria", nombre: "Literatura" },
            { nivel: "Secundaria", nombre: "Gramática" }
        ],
        precio: 28, // en Soles (S/)
        calificacion: 4.7,
        bio: "Docente de literatura y gramática, enfocado en redacción creativa.",
        img: "https://randomuser.me/api/portraits/women/82.jpg",
        otrosCursos: ["Historia del Arte"],
        alumnosACargo: 20
    },
    {
        id: 4,
        nombre: "Mr. John Smith",
        materias: [
            { nivel: "Primaria", nombre: "Inglés Básico" },
            { nivel: "Secundaria", nombre: "Inglés Intermedio" },
            { nivel: "Universidad", nombre: "Inglés Avanzado" }
        ],
        precio: 27, // en Soles (S/)
        calificacion: 4.6,
        bio: "Profesor nativo con experiencia en preparación de exámenes TOEFL/IELTS.",
        img: "https://randomuser.me/api/portraits/men/83.jpg",
        otrosCursos: ["Francés Básico"],
        alumnosACargo: 18
    },
    {
        id: 5,
        nombre: "Ing. Ana Torres",
        materias: [
            { nivel: "Secundaria", nombre: "Geometría" },
            { nivel: "Universidad", nombre: "Álgebra Lineal" }
        ],
        precio: 32, // en Soles (S/)
        calificacion: 4.5,
        bio: "Ingeniera con amor por la enseñanza de las matemáticas avanzadas.",
        img: "https://randomuser.me/api/portraits/women/84.jpg",
        otrosCursos: ["Cálculo Multivariable"],
        alumnosACargo: 10
    },
    {
        id: 6,
        nombre: "Prof. Javier Ríos",
        materias: [
            { nivel: "Secundaria", nombre: "Historia Universal" },
            { nivel: "Universidad", nombre: "Filosofía" }
        ],
        precio: 29, // en Soles (S/)
        calificacion: 4.7,
        bio: "Enseña historia y filosofía con un enfoque crítico y participativo.",
        img: "https://randomuser.me/api/portraits/men/85.jpg",
        otrosCursos: ["Economía"],
        alumnosACargo: 14
    }
];

// Materias disponibles por nivel
const materiasPorNivel = {
    "Primaria": ["Matemáticas Básicas", "Comunicación", "Inglés Básico"],
    "Secundaria": ["Álgebra", "Geometría", "Física", "Literatura", "Gramática", "Inglés Intermedio", "Historia Universal"],
    "Universidad": ["Cálculo I", "Mecánica Cuántica", "Álgebra Lineal", "Inglés Avanzado", "Filosofía"]
};

const nivelSelector = document.getElementById('nivel-selector');
const materiaSelector = document.getElementById('materia-selector');
const profesoresListContainer = document.getElementById('profesores-list-container');

/**
 * Carga las materias en el selector de materias basándose en el nivel seleccionado.
 */
function cargarMateriasPorNivel() {
    const nivel = nivelSelector.value;
    materiaSelector.innerHTML = '<option value="">-- Elige una materia --</option>'; // Limpiar opciones anteriores
    materiaSelector.disabled = true; // Deshabilitar por defecto

    if (nivel && materiasPorNivel[nivel]) {
        materiasPorNivel[nivel].forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            materiaSelector.appendChild(option);
        });
        materiaSelector.disabled = false; // Habilitar si hay materias
    }
    profesoresListContainer.innerHTML = ''; // Limpiar lista de profesores al cambiar nivel
}

/**
 * Filtra y muestra los profesores en el contenedor HTML según el nivel y materia seleccionados.
 */
function displayProfesores() {
    const nivelSeleccionado = nivelSelector.value;
    const materiaSeleccionada = materiaSelector.value;
    profesoresListContainer.innerHTML = ''; // Limpia el contenedor antes de añadir nuevos resultados

    if (!nivelSeleccionado || !materiaSeleccionada) {
        profesoresListContainer.innerHTML = '<p style="text-align: center; color: #666;">Por favor, selecciona un nivel y una materia para buscar profesores.</p>';
        return;
    }

    const profesoresFiltrados = profesores.filter(prof =>
        prof.materias.some(m => m.nivel === nivelSeleccionado && m.nombre === materiaSeleccionada)
    );

    if (profesoresFiltrados.length === 0) {
        profesoresListContainer.innerHTML = `<p style="text-align: center; color: #666;">No se encontraron profesores para ${materiaSeleccionada} en el nivel ${nivelSeleccionado}.</p>`;
        return;
    }

    profesoresFiltrados.forEach(profesor => {
        const profesorCard = document.createElement('div');
        profesorCard.classList.add('docente-info'); // Reutilizamos la clase docente-info para el estilo
        profesorCard.style.display = 'block'; // Aseguramos que sea visible
        profesorCard.style.marginTop = '20px';
        profesorCard.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                <img src="${profesor.img}" alt="Avatar de ${profesor.nombre}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary-color);">
                <div>
                    <h3>${profesor.nombre}</h3>
                    <p style="margin: 0; font-size: 0.9em; color: #555;">${materiaSeleccionada} - S/ ${profesor.precio}/hora</p>
                    <p style="margin: 0; font-size: 0.9em; color: #555;">Calificación: ${profesor.calificacion} ⭐</p>
                </div>
            </div>
            <p>${profesor.bio}</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button class="option-btn contact-btn" data-profesor-id="${profesor.id}" style="flex: 1; padding: 12px 15px; font-size: 1em;">Contactar</button>
                <button class="option-btn profile-btn" data-profesor-id="${profesor.id}" style="flex: 1; padding: 12px 15px; font-size: 1em; background-color: var(--secondary-color);">Perfil</button>
            </div>
        `;
        profesoresListContainer.appendChild(profesorCard);
    });

    // Añadir event listeners a los botones "Contactar" y "Perfil" recién creados
    document.querySelectorAll('.contact-btn').forEach(button => {
        button.addEventListener('click', handleContactProfessor);
    });
    document.querySelectorAll('.profile-btn').forEach(button => {
        button.addEventListener('click', showProfessorProfile);
    });
}

/**
 * Maneja el evento de clic del botón "Contactar".
 * Muestra un alert con el nombre del profesor.
 * @param {Event} event El evento de clic.
 */
function handleContactProfessor(event) {
    const profesorId = parseInt(event.target.dataset.profesorId);
    const profesor = profesores.find(p => p.id === profesorId);
    if (profesor) {
        alert(`Has contactado a ${profesor.nombre}. Se pondrá en contacto contigo pronto.`);
    }
}

/**
 * Muestra un alert con el perfil completo del profesor.
 * @param {Event} event El evento de clic.
 */
function showProfessorProfile(event) {
    const profesorId = parseInt(event.target.dataset.profesorId);
    const profesor = profesores.find(p => p.id === profesorId);
    if (profesor) {
        const materiasTxt = profesor.materias.map(m => `${m.nombre} (${m.nivel})`).join(', ');
        const otrosCursosTxt = profesor.otrosCursos.join(', ') || 'Ninguno';
        alert(`
            Perfil del Profesor: ${profesor.nombre}
            ------------------------------------
            Materias que enseña: ${materiasTxt}
            Otros cursos: ${otrosCursosTxt}
            Alumnos a cargo: ${profesor.alumnosACargo}
            Calificación promedio: ${profesor.calificacion} ⭐
            Precio por hora: S/ ${profesor.precio}

            Puedes calificarlo del 1 al 5.
        `);
        // Aquí podrías abrir un modal más complejo en lugar de un alert
    }
}

// Event Listeners para la sección de Alumno
document.addEventListener('DOMContentLoaded', () => {
    nivelSelector.addEventListener('change', cargarMateriasPorNivel);
    document.getElementById('btn-buscar-profesores').addEventListener('click', displayProfesores);
    document.getElementById('btn-buscar-mas-profesores').addEventListener('click', () => {
        alert('Funcionalidad "Buscar más profesores" en desarrollo.');
    });
});
