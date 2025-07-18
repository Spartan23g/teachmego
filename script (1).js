document.addEventListener('DOMContentLoaded', () => {
    // --- Referencias a elementos del DOM ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const alumnoRegisterForm = document.getElementById('alumno-register-form');
    const docenteRegisterForm = document.getElementById('docente-register-form');
    const loginScreen = document.getElementById('login-screen');

    const initialHeroSection = document.querySelector('.initial-hero-section');
    const communitySection = document.getElementById('community-section');
    // NUEVAS REFERENCIAS A SECCIONES Y ENLACES
    const comoFuncionaSection = document.getElementById('como-funciona-section');
    const acercaDeNosotrosSection = document.getElementById('acerca-de-nosotros-section');
    
    const loginContainer = document.querySelector('.login-container');

    const registerAlumnoBtn = document.getElementById('register-alumno-btn');
    const registerDocenteBtn = document.getElementById('register-docente-btn');
    const backToWelcomeAlumnoBtn = document.getElementById('back-to-welcome-alumno');
    const backToWelcomeDocenteBtn = document.getElementById('back-to-welcome-docente');

    const loginButtonHeader = document.getElementById('login-button');
    const showLoginFromWelcomeLink = document.getElementById('show-login-from-welcome');
    const showRegisterFromLoginLink = document.getElementById('show-register-from-login');
    const backToWelcomeLoginBtn = document.getElementById('back-to-welcome-login');

    const communityNavLink = document.getElementById('community-nav-link');
    // NUEVAS REFERENCIAS A ENLACES DE NAVEGACIÓN
    const comoFuncionaNavLink = document.getElementById('como-funciona-nav-link');
    const acercaDeNosotrosNavLink = document.getElementById('acerca-de-nosotros-nav-link');

    // Referencias para gestión de sesión en el header
    const userEmailDisplay = document.getElementById('user-email-display');
    const logoutButton = document.getElementById('logout-button');

    // Referencias a campos y formularios
    const alumnoNombresInput = document.getElementById('alumno-nombres');
    const alumnoApellidosInput = document.getElementById('alumno-apellidos');
    const fechaNacimientoInputAlumno = document.getElementById('fecha-nacimiento-alumno');
    const edadDisplayAlumno = document.getElementById('edad-display-alumno');
    const sexoSelectAlumno = document.getElementById('sexo-alumno');
    const regionSelectAlumno = document.getElementById('region-alumno');
    const emailInputAlumno = document.getElementById('email-alumno');
    const passwordInputAlumno = document.getElementById('password-alumno');
    const confirmPasswordInputAlumno = document.getElementById('confirm-password-alumno');
    const formAlumnoRegister = document.getElementById('form-alumno-register');

    const docenteNombresInput = document.getElementById('docente-nombres');
    const docenteApellidosInput = document.getElementById('docente-apellidos');
    const fechaNacimientoInputDocente = document.getElementById('fecha-nacimiento-docente');
    const edadDisplayDocente = document.getElementById('edad-display-docente');
    const sexoSelectDocente = document.getElementById('sexo-docente');
    const regionSelectDocente = document.getElementById('region-docente');
    const docenteEmailInput = document.getElementById('docente-email');
    const docentePasswordInput = document.getElementById('docente-password');
    const docenteConfirmPasswordInput = document.getElementById('docente-confirm-password');
    const formDocenteRegister = document.getElementById('form-docente-register');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const loginForm = document.getElementById('login-form');

    const goToRegisterHeroBtn = document.getElementById('go-to-register');

    // Referencias para la sección de comunidad y comentarios
    const reviewGrid = document.querySelector('.review-grid');
    const showReviewFormBtn = document.getElementById('show-review-form-btn');
    const reviewFormContainer = document.getElementById('review-form-container');
    const reviewForm = document.getElementById('review-form');
    const cancelReviewBtn = document.getElementById('cancel-review-btn');
    const reviewEmailInput = document.getElementById('review-email');
    const reviewTextInput = document.getElementById('review-text');
    const reviewRatingInput = document.getElementById('review-rating');
    const reviewTypeSelect = document.getElementById('review-type');

    // --- Variables Globales o de Estado ---
    let currentUser = null; // Almacena el email del usuario logeado
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || {}; // {email: {password: '...', type: 'alumno'/'docente', ...}}
    let reviews = JSON.parse(localStorage.getItem('reviews')) || [
        // Reseñas iniciales (asegurando un ID y el email completo del 'user' para la lógica de eliminación)
        { id: 'review-1', user: 'juanperez23@example.com', displayUser: 'JuanPérez23', type: 'positive', text: "¡Increíble plataforma! Encontré al profesor perfecto para mis clases de matemáticas en solo un día. La interfaz es muy intuitiva y fácil de usar.", rating: 5, date: '15 de Julio, 2025' },
        { id: 'review-2', user: 'anagarcia_profe@example.com', displayUser: 'AnaGarcía_Profe', type: 'neutral', text: "Me gustaría que se añadiera una opción para videollamadas integradas directamente en la plataforma. Por lo demás, la búsqueda de alumnos es fantástica.", rating: 4.5, date: '10 de Julio, 2025' },
        { id: 'review-3', user: 'carlos_estudiante@example.com', displayUser: 'Carlos_Estudiante', type: 'positive', text: "La función de filtro es muy buena. Pude encontrar profesores cerca de mi zona en Lima, Perú, y con disponibilidad en mi horario. ¡Excelente!", rating: 4.8, date: '08 de Julio, 2025' }
    ];

    // --- Funciones Auxiliares ---

    /**
     * Oculta todas las secciones principales (hero, login-container, community-section, cómo funciona, acerca de nosotros)
     * y las pantallas internas de login-container.
     */
    function hideAllScreens() {
        if (initialHeroSection) {
            initialHeroSection.style.display = 'none';
            initialHeroSection.style.opacity = '0';
            initialHeroSection.style.pointerEvents = 'none';
        }
        if (loginContainer) {
            loginContainer.style.display = 'none';
            loginContainer.style.opacity = '0';
            loginContainer.style.pointerEvents = 'none';
            loginContainer.classList.remove('fadeIn');
        }
        if (communitySection) {
            communitySection.style.display = 'none';
            communitySection.style.opacity = '0';
            communitySection.style.pointerEvents = 'none';
        }
        // NUEVO: Ocultar las nuevas secciones
        if (comoFuncionaSection) {
            comoFuncionaSection.style.display = 'none';
            comoFuncionaSection.style.opacity = '0';
            comoFuncionaSection.style.pointerEvents = 'none';
        }
        if (acercaDeNosotrosSection) {
            acercaDeNosotrosSection.style.display = 'none';
            acercaDeNosotrosSection.style.opacity = '0';
            acercaDeNosotrosSection.style.pointerEvents = 'none';
        }

        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (alumnoRegisterForm) alumnoRegisterForm.classList.remove('active');
        if (docenteRegisterForm) docenteRegisterForm.classList.remove('active');
        if (loginScreen) loginScreen.classList.remove('active');
    }

    /**
     * Muestra una pantalla específica y oculta las demás.
     * @param {HTMLElement} screenToShow El elemento de la pantalla a mostrar.
     * @param {boolean} isLoginContainerScreen Indica si la pantalla a mostrar es una dentro del login-container.
     */
    function showScreen(screenToShow, isLoginContainerScreen = false) {
        hideAllScreens();

        if (screenToShow) {
            if (isLoginContainerScreen) {
                if (loginContainer) {
                    loginContainer.style.display = 'block';
                    loginContainer.classList.remove('fadeIn');
                    void loginContainer.offsetWidth; // Truco para forzar el reflow
                    loginContainer.classList.add('fadeIn');
                    loginContainer.style.opacity = '1';
                    loginContainer.style.pointerEvents = 'auto';
                }
                screenToShow.classList.add('active');
            } else {
                screenToShow.style.display = (screenToShow === initialHeroSection) ? 'flex' : 'block';
                screenToShow.style.opacity = '1';
                screenToShow.style.pointerEvents = 'auto';
            }
        }
    }

    /**
     * Vuelve al estado inicial: muestra la initial-hero-section y oculta todo lo demás.
     */
    function returnToInitialState() {
        showScreen(initialHeroSection);
    }

    /**
     * Limpia todos los campos de un formulario dado.
     * @param {HTMLFormElement} form El formulario a limpiar.
     */
    function clearFormFields(form) {
        if (form) form.reset();
    }

    /**
     * Calcula la edad a partir de una fecha de nacimiento y valida contra una edad mínima.
     * @param {string} fechaNacimientoStr La fecha de nacimiento en formato 'YYYY-MM-DD'.
     * @param {number} minAge La edad mínima requerida.
     * @returns {number|null} La edad calculada o null si es inválida/no cumple el requisito.
     */
    function calcularEdad(fechaNacimientoStr, minAge) {
        if (!fechaNacimientoStr) {
            return null;
        }
        const fechaNacimiento = new Date(fechaNacimientoStr + 'T00:00:00');
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesDiff = hoy.getMonth() - fechaNacimiento.getMonth();
        const diaDiff = hoy.getDate() - fechaNacimiento.getDate();

        if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
            edad--;
        }
        if (isNaN(fechaNacimiento.getTime())) {
            return null;
        }
        return edad >= minAge ? edad : null;
    }

    /**
     * Actualiza la interfaz de usuario del header según el estado de la sesión.
     * Muestra/oculta botones de login/logout y el email del usuario.
     */
    function updateHeaderForSession() {
        if (currentUser) {
            if (loginButtonHeader) loginButtonHeader.classList.add('hidden');
            if (userEmailDisplay) {
                // Obtener el nombre o la parte antes del @ del email
                const displayUserName = currentUser.split('@')[0];
                userEmailDisplay.textContent = `Hola, ${displayUserName}`;
                userEmailDisplay.classList.remove('hidden');
            }
            if (logoutButton) logoutButton.classList.remove('hidden');
            // Oculta el botón "Crear Cuenta" del hero si ya hay sesión
            if (goToRegisterHeroBtn) goToRegisterHeroBtn.classList.add('hidden');
        } else {
            if (loginButtonHeader) loginButtonHeader.classList.remove('hidden');
            if (userEmailDisplay) userEmailDisplay.classList.add('hidden');
            if (logoutButton) logoutButton.classList.add('hidden');
            // Muestra el botón "Crear Cuenta" del hero si no hay sesión
            if (goToRegisterHeroBtn) goToRegisterHeroBtn.classList.remove('hidden');
        }
    }

    /**
     * Renderiza las reseñas en la sección de comunidad.
     * Incluye lógica para mostrar el botón de eliminar solo al usuario creador.
     */
    function renderReviews() {
        if (!reviewGrid) return; // Asegúrate de que el contenedor exista

        reviewGrid.innerHTML = ''; // Limpia las reseñas existentes

        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            // Usamos review.id como data-review-id
            reviewCard.classList.add('review-card');
            reviewCard.setAttribute('data-review-id', review.id);

            const badgeClass = review.type === 'positive' ? 'positive' : review.type === 'neutral' ? 'neutral' : 'negative';
            const badgeText = review.type === 'positive' ? 'Excelente' : review.type === 'neutral' ? 'Sugerencia' : 'Problema';

            // Determinar el nombre a mostrar (usar displayUser si existe, sino la parte antes del @ del email)
            const displayUserName = review.displayUser || review.user.split('@')[0];

            // Condición para mostrar u ocultar el botón de eliminar
            const showDeleteButton = currentUser && currentUser === review.user ? '' : 'hidden'; // Si el usuario logeado es el mismo que publicó

            reviewCard.innerHTML = `
                <div class="review-header">
                    <span class="user-avatar"><i class="fas fa-user-circle"></i></span>
                    <div class="user-info">
                        <h4>${displayUserName} <span class="badge ${badgeClass}">${badgeText}</span></h4>
                        <span class="review-date">${review.date}</span>
                    </div>
                    <button class="delete-review-btn ${showDeleteButton}" data-review-id="${review.id}">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </div>
                <p class="review-text">"${review.text}"</p>
                <div class="review-actions">
                    <span><i class="fas fa-star"></i> ${review.rating.toFixed(1)}</span>
                    <span><i class="fas fa-thumbs-up"></i> ${Math.floor(Math.random() * 20) + 1}</span>
                    <span><i class="fas fa-comment"></i> ${Math.floor(Math.random() * 5) + 1}</span>
                </div>
            `;
            reviewGrid.appendChild(reviewCard);
        });
    }

    /**
     * Guarda el estado de usuarios registrados y reseñas en localStorage.
     */
    function saveData() {
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        localStorage.setItem('reviews', JSON.stringify(reviews));
        // Guardar el usuario actual también
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }

    // --- EVENT LISTENERS para Navegación de Pantallas y Validaciones ---

    // Botón "Crear Cuenta" del hero section
    if (goToRegisterHeroBtn) {
        goToRegisterHeroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(welcomeScreen, true);
            clearFormFields(formAlumnoRegister);
            clearFormFields(formDocenteRegister);
            clearFormFields(loginForm);
            if (edadDisplayAlumno) edadDisplayAlumno.textContent = '';
            if (edadDisplayDocente) edadDisplayDocente.textContent = '';
        });
    }

    // Botón "Iniciar Sesión" del HEADER
    if (loginButtonHeader) {
        loginButtonHeader.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(loginScreen, true);
            clearFormFields(formAlumnoRegister);
            clearFormFields(formDocenteRegister);
            clearFormFields(loginForm);
            if (edadDisplayAlumno) edadDisplayAlumno.textContent = '';
            if (edadDisplayDocente) edadDisplayDocente.textContent = '';
        });
    }

    // Botón "Comunidad" del HEADER
    if (communityNavLink) {
        communityNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(communitySection, false);
            renderReviews(); // Vuelve a renderizar para actualizar los botones de eliminar
            // Desplazamiento suave a la sección de comunidad
            window.scrollTo({
                top: communitySection.offsetTop - 70, // Ajuste para el header fijo
                behavior: 'smooth'
            });
        });
    }

    // NUEVO: Botón "Cómo Funciona" del HEADER
    if (comoFuncionaNavLink && comoFuncionaSection) {
        comoFuncionaNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(comoFuncionaSection, false); // Muestra la nueva sección
            window.scrollTo({
                top: comoFuncionaSection.offsetTop - 70, // Ajuste para el header fijo
                behavior: 'smooth'
            });
        });
    }

    // NUEVO: Botón "Acerca de Nosotros" del HEADER
    if (acercaDeNosotrosNavLink && acercaDeNosotrosSection) {
        acercaDeNosotrosNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(acercaDeNosotrosSection, false); // Muestra la nueva sección
            window.scrollTo({
                top: acercaDeNosotrosSection.offsetTop - 70, // Ajuste para el header fijo
                behavior: 'smooth'
            });
        });
    }


    // Enlace "Iniciar Sesión" en la pantalla de bienvenida
    if (showLoginFromWelcomeLink) {
        showLoginFromWelcomeLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(loginScreen, true);
            clearFormFields(loginForm); // Solo limpiar el formulario de login al cambiar a él
        });
    }

    // Enlace "Crea una aquí" en la pantalla de login
    if (showRegisterFromLoginLink) {
        showRegisterFromLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(welcomeScreen, true);
            clearFormFields(loginForm); // Limpiar login if se vuelve al welcome
        });
    }

    // Campo de fecha de nacimiento del ALUMNO
    if (fechaNacimientoInputAlumno && edadDisplayAlumno) {
        fechaNacimientoInputAlumno.addEventListener('change', () => {
            const fechaSeleccionada = fechaNacimientoInputAlumno.value;
            const EDAD_MINIMA_ALUMNO = 14;
            const edad = calcularEdad(fechaSeleccionada, EDAD_MINIMA_ALUMNO);

            if (edad !== null) {
                edadDisplayAlumno.textContent = `Edad: ${edad} años. ¡Puedes registrarte!`;
                edadDisplayAlumno.style.color = '#28a745';
            } else if (fechaSeleccionada) {
                edadDisplayAlumno.textContent = `Debes tener al menos ${EDAD_MINIMA_ALUMNO} años para registrarte como alumno.`;
                edadDisplayAlumno.style.color = '#dc3545';
            } else {
                edadDisplayAlumno.textContent = '';
            }
        });
    }

    // Campo de fecha de nacimiento del DOCENTE
    if (fechaNacimientoInputDocente && edadDisplayDocente) {
        fechaNacimientoInputDocente.addEventListener('change', () => {
            const fechaSeleccionada = fechaNacimientoInputDocente.value;
            const EDAD_MINIMA_DOCENTE = 18;
            const edad = calcularEdad(fechaSeleccionada, EDAD_MINIMA_DOCENTE);

            if (edad !== null) {
                edadDisplayDocente.textContent = `Edad: ${edad} años.`;
                edadDisplayDocente.style.color = '#28a745';
            } else if (fechaSeleccionada) {
                edadDisplayDocente.textContent = `Debes tener al menos ${EDAD_MINIMA_DOCENTE} años para registrarte como docente.`;
                edadDisplayDocente.style.color = '#dc3545';
            } else {
                edadDisplayDocente.textContent = '';
            }
        });
    }

    // Botón "Registrarme como Alumno" - Muestra el formulario de alumno
    if (registerAlumnoBtn) {
        registerAlumnoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(alumnoRegisterForm, true);
            clearFormFields(formAlumnoRegister);
            if (edadDisplayAlumno) edadDisplayAlumno.textContent = '';
        });
    }

    // Botón "Registrarme como Docente" - Muestra el formulario de docente
    if (registerDocenteBtn) {
        registerDocenteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(docenteRegisterForm, true);
            clearFormFields(formDocenteRegister);
            if (edadDisplayDocente) edadDisplayDocente.textContent = '';
        });
    }

    // Botones "Volver"
    if (backToWelcomeAlumnoBtn) {
        backToWelcomeAlumnoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(welcomeScreen, true);
            clearFormFields(formAlumnoRegister);
        });
    }
    if (backToWelcomeDocenteBtn) {
        backToWelcomeDocenteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(welcomeScreen, true);
            clearFormFields(formDocenteRegister);
        });
    }
    if (backToWelcomeLoginBtn) {
        backToWelcomeLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen(welcomeScreen, true);
            clearFormFields(loginForm);
        });
    }

    // --- Manejo de Formularios de Registro ---

    // Formulario de Registro de Alumno
    if (formAlumnoRegister) {
        formAlumnoRegister.addEventListener('submit', (e) => {
            e.preventDefault();

            const EDAD_MINIMA_ALUMNO = 14;
            const edad = calcularEdad(fechaNacimientoInputAlumno.value, EDAD_MINIMA_ALUMNO);

            if (!alumnoNombresInput.value.trim() || !alumnoApellidosInput.value.trim() || !fechaNacimientoInputAlumno.value ||
                !sexoSelectAlumno.value || !regionSelectAlumno.value || !emailInputAlumno.value.trim() ||
                !passwordInputAlumno.value || !confirmPasswordInputAlumno.value) {
                alert('Por favor, completa todos los campos requeridos del alumno.');
                return;
            }
            if (passwordInputAlumno.value !== confirmPasswordInputAlumno.value) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (passwordInputAlumno.value.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(emailInputAlumno.value)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            if (edad === null) {
                alert(`Debes tener al menos ${EDAD_MINIMA_ALUMNO} años para registrarte como alumno y tu fecha de nacimiento debe ser válida.`);
                return;
            }
            if (registeredUsers[emailInputAlumno.value.trim()]) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.');
                return;
            }

            // Almacenar usuario
            registeredUsers[emailInputAlumno.value.trim()] = {
                password: passwordInputAlumno.value,
                type: 'alumno',
                nombres: alumnoNombresInput.value.trim(),
                apellidos: alumnoApellidosInput.value.trim(),
                fechaNacimiento: fechaNacimientoInputAlumno.value,
                sexo: sexoSelectAlumno.value,
                region: regionSelectAlumno.value
            };
            saveData(); // Guardar en localStorage

            alert('¡Registro de Alumno exitoso! Ahora puedes iniciar sesión.');
            showScreen(loginScreen, true); // Dirige a la pantalla de login
            clearFormFields(formAlumnoRegister);
            clearFormFields(loginForm); // Limpia el formulario de login también
        });
    }

    // Formulario de Registro de Docente
    if (formDocenteRegister) {
        formDocenteRegister.addEventListener('submit', (e) => {
            e.preventDefault();

            const EDAD_MINIMA_DOCENTE = 18;
            const edad = calcularEdad(fechaNacimientoInputDocente.value, EDAD_MINIMA_DOCENTE);

            if (!docenteNombresInput.value.trim() || !docenteApellidosInput.value.trim() || !fechaNacimientoInputDocente.value ||
                !sexoSelectDocente.value || !regionSelectDocente.value || !docenteEmailInput.value.trim() ||
                !docentePasswordInput.value || !docenteConfirmPasswordInput.value) {
                alert('Por favor, completa todos los campos requeridos del docente.');
                return;
            }
            if (docentePasswordInput.value !== docenteConfirmPasswordInput.value) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            if (docentePasswordInput.value.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(docenteEmailInput.value)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }
            if (edad === null) {
                alert(`Debes tener al menos ${EDAD_MINIMA_DOCENTE} años para registrarte como docente y tu fecha de nacimiento debe ser válida.`);
                return;
            }
            if (registeredUsers[docenteEmailInput.value.trim()]) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.');
                return;
            }

            // Almacenar usuario
            registeredUsers[docenteEmailInput.value.trim()] = {
                password: docentePasswordInput.value,
                type: 'docente',
                nombres: docenteNombresInput.value.trim(),
                apellidos: docenteApellidosInput.value.trim(),
                fechaNacimiento: fechaNacimientoInputDocente.value,
                sexo: sexoSelectDocente.value,
                region: regionSelectDocente.value
            };
            saveData(); // Guardar en localStorage

            alert('¡Registro de Docente exitoso! Ahora puedes iniciar sesión.');
            showScreen(loginScreen, true); // Dirige a la pantalla de login
            clearFormFields(formDocenteRegister);
            clearFormFields(loginForm); // Limpia el formulario de login también
        });
    }

    // --- Lógica de Inicio y Cierre de Sesión ---

    // Formulario de Inicio de Sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value;

            if (!email || !password) {
                alert('Por favor, ingresa tu correo y contraseña.');
                return;
            }
            if (!/\S+@\S+\.\S+/.test(email)) {
                alert('Por favor, ingresa un correo electrónico válido.');
                return;
            }

            const user = registeredUsers[email];

            if (user && user.password === password) {
                currentUser = email; // Guarda el email completo del usuario
                saveData(); // Guarda el usuario actual
                alert(`¡Bienvenido de nuevo, ${email.split('@')[0]}!`);
                returnToInitialState(); // Vuelve al estado inicial después del login
                clearFormFields(loginForm);
                updateHeaderForSession(); // Actualiza el header
                renderReviews(); // Vuelve a renderizar para mostrar/ocultar botones de eliminar
            } else {
                alert('Correo o contraseña incorrectos. Por favor, verifica tus credenciales.');
            }
        });
    }

    // Botón de Cerrar Sesión
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = null; // Limpia el usuario actual
            saveData(); // Guarda el estado (sin usuario)
            alert('Has cerrado sesión.');
            updateHeaderForSession(); // Actualiza el header
            renderReviews(); // Vuelve a renderizar para ocultar los botones de eliminar
            returnToInitialState(); // Opcional: regresa a la pantalla de inicio
        });
    }

    // --- Lógica de Comentarios (Review Section) ---

    // Botón "Dejar un Comentario"
    if (showReviewFormBtn) {
        showReviewFormBtn.addEventListener('click', () => {
            if (currentUser) {
                // Si el usuario está logeado, precargar el email y mostrar el formulario
                reviewEmailInput.value = currentUser;
                reviewEmailInput.readOnly = true; // Hacer el campo de email solo lectura
                reviewFormContainer.classList.remove('hidden');
                showReviewFormBtn.classList.add('hidden'); // Ocultar el botón "Dejar un Comentario"
            } else {
                alert('Debes iniciar sesión para dejar un comentario.');
                showScreen(loginScreen, true); // Redirigir a la pantalla de login
            }
        });
    }

    // Botón "Cancelar" en el formulario de comentarios
    if (cancelReviewBtn) {
        cancelReviewBtn.addEventListener('click', () => {
            reviewFormContainer.classList.add('hidden');
            showReviewFormBtn.classList.remove('hidden');
            clearFormFields(reviewForm);
            reviewEmailInput.readOnly = false; // Restablecer a editable
        });
    }

    // Envío del formulario de comentarios
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = reviewEmailInput.value.trim();
            const text = reviewTextInput.value.trim();
            const rating = parseFloat(reviewRatingInput.value);
            const type = reviewTypeSelect.value;

            if (!email || !text || !rating || !type) {
                alert('Por favor, completa todos los campos del comentario.');
                return;
            }
            if (rating < 1 || rating > 5) {
                alert('La calificación debe estar entre 1 y 5.');
                return;
            }
            if (!currentUser || currentUser !== email) {
                alert('El correo del comentario debe coincidir con tu sesión actual.');
                return;
            }
            if (text.length < 10) {
                alert('Tu comentario debe tener al menos 10 caracteres.');
                return;
            }

            const newReview = {
                id: `review-${Date.now()}`, // Genera un ID único basado en la marca de tiempo
                user: email, // Guardamos el email completo para la lógica de eliminación
                displayUser: email.split('@')[0], // Nombre de usuario para mostrar
                type: type,
                text: text,
                rating: rating,
                date: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
            };

            reviews.unshift(newReview); // Añadir la nueva reseña al principio
            saveData(); // Guardar las reseñas actualizadas
            renderReviews(); // Volver a renderizar las reseñas

            alert('¡Tu comentario ha sido enviado con éxito!');
            reviewFormContainer.classList.add('hidden'); // Ocultar el formulario
            showReviewFormBtn.classList.remove('hidden'); // Mostrar el botón para dejar otro comentario
            clearFormFields(reviewForm);
            reviewEmailInput.readOnly = false; // Restablecer a editable
        });
    }

    // --- Manejo de la eliminación de comentarios (EVENT DELEGATION) ---
    if (reviewGrid) {
        reviewGrid.addEventListener('click', (e) => {
            // Verifica si el clic fue en un botón con la clase 'delete-review-btn' o un hijo de este
            const deleteButton = e.target.closest('.delete-review-btn');
            if (deleteButton) {
                const reviewIdToDelete = deleteButton.dataset.reviewId;
                if (confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
                    // Filtrar el array de reseñas para remover la que tiene el ID correspondiente
                    const initialReviewCount = reviews.length;
                    reviews = reviews.filter(review => review.id !== reviewIdToDelete);

                    if (reviews.length < initialReviewCount) {
                        saveData(); // Guardar el estado actualizado de las reseñas
                        renderReviews(); // Volver a renderizar los comentarios
                        alert('Comentario eliminado exitosamente.');
                    } else {
                        alert('No se encontró el comentario para eliminar.');
                    }
                }
            }
        });
    }


    // --- Inicialización al cargar la página ---
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
    }
    updateHeaderForSession(); // Configura el header según el usuario logeado
    renderReviews(); // Renderiza las reseñas existentes
    returnToInitialState(); // Asegura que la pantalla inicial sea la correcta
});

