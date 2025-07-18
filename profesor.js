// profesor.js

// Array de alumnos simulados, ahora como objetos para almacenar más datos
let alumnosSimulados = [
    { id: 1, nombre: "Juan Pérez", horario: "Martes 3-4 PM", nota: 15, calificacionDocente: 4, observaciones: "Buen progreso en álgebra." },
    { id: 2, nombre: "María López", horario: "Miércoles 5-6 PM", nota: 18, calificacionDocente: 5, observaciones: "Muy aplicada, participa activamente." },
    { id: 3, nombre: "Pedro García", horario: "Lunes 10-11 AM", nota: 12, calificacionDocente: 3, observaciones: "Necesita reforzar lectura comprensiva." }
];

const alumnosListUl = document.getElementById('alumnos-list');
const alumnoInputName = document.getElementById('alumno-input-name');
const btnAddAlumno = document.getElementById('btn-add-alumno');

// Elementos del modal de detalles del alumno
const alumnoDetailsModal = document.getElementById('alumno-details-modal');
const detailAlumnoName = document.getElementById('detail-alumno-name');
const detailHorario = document.getElementById('detail-horario');
const detailNota = document.getElementById('detail-nota');
const detailCalificacion = document.getElementById('detail-calificacion');
const detailObservaciones = document.getElementById('detail-observaciones');
const btnSaveAlumnoDetails = document.getElementById('btn-save-alumno-details');
const btnCloseAlumnoDetails = document.getElementById('btn-close-alumno-details');

let currentAlumnoId = null; // Para saber qué alumno estamos editando

/**
 * Renderiza la lista de alumnos en la sección del profesor.
 */
function renderAlumnosList() {
    alumnosListUl.innerHTML = ''; // Limpiar la lista antes de renderizar

    alumnosSimulados.forEach(alumno => {
        const listItem = document.createElement('li');
        listItem.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #eee;
            color: var(--text-color-dark);
            font-size: 1.05em;
            flex-wrap: wrap; /* Permite que los elementos se envuelvan en pantallas pequeñas */
            gap: 10px; /* Espacio entre elementos en wrap */
        `;
        listItem.innerHTML = `
            <span>${alumno.nombre}</span>
            <div style="display: flex; gap: 10px;">
                <button class="option-btn view-details-btn" data-alumno-id="${alumno.id}" style="padding: 8px 15px; font-size: 0.9em; border-radius: 5px; background-color: var(--secondary-color);">Ver detalles</button>
                <button class="option-btn delete-alumno-btn" data-alumno-id="${alumno.id}" style="padding: 8px 15px; font-size: 0.9em; border-radius: 5px; background-color: #dc3545;">Eliminar</button>
            </div>
        `;
        alumnosListUl.appendChild(listItem);
    });

    // Añadir event listeners a los botones "Ver detalles" y "Eliminar"
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', handleViewDetailsAlumno);
    });
    document.querySelectorAll('.delete-alumno-btn').forEach(button => {
        button.addEventListener('click', handleDeleteAlumno);
    });
}

/**
 * Añade un nuevo alumno a la lista.
 */
function handleAddAlumno() {
    const nombre = alumnoInputName.value.trim();
    if (nombre) {
        const newId = alumnosSimulados.length > 0 ? Math.max(...alumnosSimulados.map(a => a.id)) + 1 : 1;
        alumnosSimulados.push({
            id: newId,
            nombre: nombre,
            horario: "",
            nota: null,
            calificacionDocente: null,
            observaciones: ""
        });
        alumnoInputName.value = ''; // Limpiar input
        renderAlumnosList(); // Volver a renderizar la lista
        alert(`Alumno "${nombre}" agregado.`);
    } else {
        alert('Por favor, ingresa un nombre para el alumno.');
    }
}

/**
 * Elimina un alumno de la lista.
 * @param {Event} event El evento de clic.
 */
function handleDeleteAlumno(event) {
    const alumnoId = parseInt(event.target.dataset.alumnoId);
    if (confirm('¿Estás seguro de que quieres eliminar a este alumno?')) {
        alumnosSimulados = alumnosSimulados.filter(a => a.id !== alumnoId);
        renderAlumnosList(); // Volver a renderizar la lista
        alert('Alumno eliminado.');
    }
}

/**
 * Muestra los detalles de un alumno en un "modal" (la sección oculta).
 * @param {Event} event El evento de clic.
 */
function handleViewDetailsAlumno(event) {
    const alumnoId = parseInt(event.target.dataset.alumnoId);
    const alumno = alumnosSimulados.find(a => a.id === alumnoId);

    if (alumno) {
        currentAlumnoId = alumno.id; // Guardar el ID del alumno que estamos editando
        detailAlumnoName.textContent = alumno.nombre;
        detailHorario.value = alumno.horario || '';
        detailNota.value = alumno.nota || '';
        detailCalificacion.value = alumno.calificacionDocente || '';
        detailObservaciones.value = alumno.observaciones || '';
        alumnoDetailsModal.style.display = 'block'; // Mostrar la sección de detalles
    }
}

/**
 * Guarda los detalles del alumno editado.
 */
function handleSaveAlumnoDetails() {
    const alumno = alumnosSimulados.find(a => a.id === currentAlumnoId);
    if (alumno) {
        alumno.horario = detailHorario.value;
        alumno.nota = parseFloat(detailNota.value) || null;
        alumno.calificacionDocente = parseFloat(detailCalificacion.value) || null;
        alumno.observaciones = detailObservaciones.value;
        alert(`Detalles de ${alumno.nombre} guardados. (Solo visible para otros docentes si implementas un sistema de visualización de perfiles de alumnos).`);
        closeAlumnoDetailsModal();
    }
}

/**
 * Cierra el "modal" de detalles del alumno.
 */
function closeAlumnoDetailsModal() {
    alumnoDetailsModal.style.display = 'none';
    currentAlumnoId = null; // Limpiar el ID
    // Limpiar los campos del formulario de detalles
    detailAlumnoName.textContent = '';
    detailHorario.value = '';
    detailNota.value = '';
    detailCalificacion.value = '';
    detailObservaciones.value = '';
}

/**
 * Maneja la subida de material, mostrando un alert con el nombre del archivo seleccionado.
 */
function handleSubirMaterial() {
    const fileInput = document.getElementById('material-file-input');
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        alert(`Archivo "${fileName}" subido con éxito (simulado)!`);
        fileInput.value = ''; // Limpiar el input después de la "subida"
    } else {
        alert('Por favor, selecciona un archivo antes de subir.');
    }
}

// Event Listeners para la sección de Profesor
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-subir-material').addEventListener('click', handleSubirMaterial);
    btnAddAlumno.addEventListener('click', handleAddAlumno);
    btnSaveAlumnoDetails.addEventListener('click', handleSaveAlumnoDetails);
    btnCloseAlumnoDetails.addEventListener('click', closeAlumnoDetailsModal);
});