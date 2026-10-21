// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

// Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {
  // Simulamos una espera de 1.5 segundos usando una Promesa
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Una vez pasada la espera, ocultamos el div #loading-state
  loadingState.style.display = 'none';
  
  // Invocamos a la función pintarTareas()
  pintarTareas();
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {
  // 1. Limpiamos el contenedor para evitar duplicados al repintar
  listaContenedor.innerHTML = '';

  // 2. Filtramos el array global según el estado del botón pulsado
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroActual === 'Todas') return true;
    if (filtroActual === 'Pendientes') return !tarea.completada;
    if (filtroActual === 'Completadas') return tarea.completada;
  });

  // 3. Recorremos el array filtrado para inyectar el HTML
  tareasFiltradas.forEach(tarea => {
    // A) Creamos el elemento base <li> en la memoria
    const li = document.createElement('li');
    
    // B) Añadimos las clases base y la clase dinámica de prioridad (Alta, Media, Baja)
    li.classList.add('item-tarea', tarea.prioridad);
    
    // C) Si está completada, le añadimos la clase CSS que la tacha y la vuelve opaca
    if (tarea.completada) {
      li.classList.add('completada');
    }

    // D) Inyectamos el texto y el botón de acción usando plantillas literales
    li.innerHTML = `
      <span>${tarea.titulo}</span>
      <button class="btn-toggle">
        ${tarea.completada ? 'Desmarcar' : 'Completar'}
      </button>
    `;

    // E) Finalmente, anclamos la tarjeta terminada al DOM visible
    listaContenedor.appendChild(li);
  });
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // TODO: Capturar los valores de los inputs de forma segura
  // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  // TODO: Volver a invocar pintarTareas() y resetear el formulario
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (event) => {
    // Quitar clase active al botón anterior y ponérsela al pulsado
    document.querySelector('.btn-filtro.active').classList.remove('active');
    event.target.classList.add('active');

    // TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
    // TODO: Invocar pintarTareas() para refrescar la pantalla
  });
});

// Arrancar la aplicación
inicializarApp();