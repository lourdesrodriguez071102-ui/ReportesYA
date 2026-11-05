/* =========================================================
   ReportaYa - Funcionalidades con JavaScript (TP4)

   Índice:
   1. Datos del sistema
   2. Guardar y cargar reportes (localStorage)
   3. Referencias a elementos del DOM
   4. Funciones auxiliares
   5. Mostrar los reportes (crear tarjetas en el DOM)
   6. Filtros y búsqueda
   7. Estadísticas automáticas
   8. Formulario de nuevo reporte
   9. Contador de caracteres y vista previa de la foto
   10. Navbar: enlace activo y cierre del menú en celular
   11. Botón "volver arriba"
   12. Inicio de la aplicación
   ========================================================= */


/* ===== 1. DATOS DEL SISTEMA ===== */

// Categorías: nombre para mostrar e ícono de Bootstrap Icons
const CATEGORIAS = {
  bache: { nombre: "Bache", icono: "bi-cone-striped" },
  luminaria: { nombre: "Luminaria rota", icono: "bi-lightbulb" },
  basural: { nombre: "Basural", icono: "bi-trash3" },
  agua: { nombre: "Pérdida de agua", icono: "bi-droplet" },
  otro: { nombre: "Otro", icono: "bi-three-dots" }
};

const BARRIOS = {
  "centro": "Centro",
  "barrio-norte": "Barrio Norte",
  "barrio-sur": "Barrio Sur",
  "villa-lujan": "Villa Luján"
};

// Estados: nombre para mostrar y clase de color de Bootstrap
const ESTADOS = {
  "pendiente": { nombre: "Pendiente", clase: "text-bg-danger" },
  "en-proceso": { nombre: "En proceso", clase: "text-bg-warning" },
  "resuelto": { nombre: "Resuelto", clase: "text-bg-success" }
};

// Reportes de ejemplo (se usan la primera vez que se abre la página)
const REPORTES_INICIALES = [
  {
    id: 1,
    titulo: "Bache grande en la esquina",
    descripcion: "Bache profundo que ocupa medio carril, peligroso para motos y bicicletas.",
    categoria: "bache",
    barrio: "centro",
    direccion: "San Martín 450",
    estado: "pendiente",
    fecha: "2026-10-20",
    tieneFoto: false
  },
  {
    id: 2,
    titulo: "Luminaria apagada hace una semana",
    descripcion: "La cuadra queda completamente a oscuras durante la noche.",
    categoria: "luminaria",
    barrio: "barrio-norte",
    direccion: "Av. Mate de Luna 1800",
    estado: "en-proceso",
    fecha: "2026-10-15",
    tieneFoto: false
  },
  {
    id: 3,
    titulo: "Basural en el terreno baldío",
    descripcion: "Acumulación de residuos en el terreno de la esquina, con presencia de roedores.",
    categoria: "basural",
    barrio: "barrio-sur",
    direccion: "Lavalle 2300",
    estado: "resuelto",
    fecha: "2026-10-02",
    tieneFoto: false
  }
];

const CLAVE_STORAGE = "reportaya-reportes";
const MAX_CARACTERES = 300;


/* ===== 2. GUARDAR Y CARGAR REPORTES (localStorage) =====
   localStorage guarda datos en el navegador, así los reportes
   nuevos no se pierden al recargar la página.
   Solo guarda texto, por eso usamos JSON.stringify y JSON.parse. */

function cargarReportes() {
  try {
    const guardados = localStorage.getItem(CLAVE_STORAGE);
    if (guardados) {
      return JSON.parse(guardados);  // texto -> array de objetos
    }
  } catch (error) {
    console.warn("No se pudieron leer los reportes guardados", error);
  }
  // Si no hay nada guardado, usamos una copia de los reportes de ejemplo
  return [...REPORTES_INICIALES];
}

function guardarReportes() {
  try {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(reportes));  // array -> texto
  } catch (error) {
    console.warn("No se pudieron guardar los reportes", error);
  }
}

// Lista de reportes con la que trabaja toda la aplicación
let reportes = cargarReportes();


/* ===== 3. REFERENCIAS A ELEMENTOS DEL DOM =====
   Buscamos una sola vez los elementos que vamos a usar. */

// Listado y filtros
const listaReportes = document.getElementById("lista-reportes");
const mensajeVacio = document.getElementById("mensaje-vacio");
const contadorResultados = document.getElementById("contador-resultados");
const formFiltros = document.getElementById("form-filtros");
const filtroBusqueda = document.getElementById("filtro-busqueda");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroBarrio = document.getElementById("filtro-barrio");
const filtroEstado = document.getElementById("filtro-estado");
const btnLimpiarFiltros = document.getElementById("btn-limpiar-filtros");
const btnRestablecer = document.getElementById("btn-restablecer");

// Formulario
const formulario = document.getElementById("form-reporte");
const campoDescripcion = document.getElementById("descripcion");
const contadorCaracteres = document.getElementById("contador-caracteres");
const campoFoto = document.getElementById("foto");
const vistaPrevia = document.getElementById("vista-previa");
const imagenPrevia = document.getElementById("imagen-previa");
const contenedorAlerta = document.getElementById("alerta-formulario");

// Estadísticas
const statTotal = document.getElementById("stat-total");
const statPendiente = document.getElementById("stat-pendiente");
const statProceso = document.getElementById("stat-proceso");
const statResuelto = document.getElementById("stat-resuelto");
const tablaCategorias = document.getElementById("tabla-categorias");
const tablaTotal = document.getElementById("tabla-total");

// Navegación
const menuPrincipal = document.getElementById("menuPrincipal");
const enlacesMenu = document.querySelectorAll("#menuPrincipal a");
const secciones = document.querySelectorAll("main section[id]");
const btnArriba = document.getElementById("btn-arriba");


/* ===== 4. FUNCIONES AUXILIARES ===== */

// Crea un elemento HTML con clases y texto en una sola línea
function crearElemento(etiqueta, clases = "", texto = "") {
  const elemento = document.createElement(etiqueta);
  if (clases) elemento.className = clases;
  // textContent (y no innerHTML) evita que se ejecute código
  // si el usuario escribe etiquetas HTML en el formulario
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Crea un ícono de Bootstrap Icons, por ejemplo: <i class="bi bi-geo-alt me-1"></i>
function crearIcono(nombre) {
  return crearElemento("i", `bi ${nombre} me-1`);
}

// "2026-10-20" -> "20/10/2026"
function formatearFecha(fechaISO) {
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

// Fecha de hoy en formato "AAAA-MM-DD" (según la hora local)
function fechaDeHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

// Quita tildes y pasa a minúsculas para que la búsqueda
// encuentre "luján" aunque se escriba "lujan"
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}


/* ===== 5. MOSTRAR LOS REPORTES (crear tarjetas en el DOM) ===== */

// Recibe un reporte (objeto) y devuelve la tarjeta lista para insertar
function crearTarjeta(reporte, esNuevo = false) {
  const categoria = CATEGORIAS[reporte.categoria];
  const estado = ESTADOS[reporte.estado];

  // Columna de la grilla
  const columna = crearElemento("div", "col");

  // Tarjeta
  const tarjeta = crearElemento("article", "card h-100 border-0 shadow-sm tarjeta-reporte");
  if (esNuevo) tarjeta.classList.add("tarjeta-nueva");

  // Cuerpo de la tarjeta
  const cuerpo = crearElemento("div", "card-body");

  const cabecera = crearElemento("div", "d-flex justify-content-between align-items-center mb-3");
  const etiqueta = crearElemento("span", "badge text-bg-light");
  etiqueta.append(crearIcono(categoria.icono), categoria.nombre);
  const badgeEstado = crearElemento("span", `badge rounded-pill ${estado.clase}`, estado.nombre);
  cabecera.append(etiqueta, badgeEstado);

  const titulo = crearElemento("h3", "card-title h5 fw-bold", reporte.titulo);
  const descripcion = crearElemento("p", "card-text text-secondary", reporte.descripcion);

  const direccion = crearElemento("p", "small text-secondary mb-0");
  direccion.append(crearIcono("bi-signpost"), reporte.direccion);

  cuerpo.append(cabecera, titulo, descripcion, direccion);

  if (reporte.tieneFoto) {
    const foto = crearElemento("span", "badge text-bg-secondary mt-2");
    foto.append(crearIcono("bi-camera"), "Con foto");
    cuerpo.append(foto);
  }

  // Pie de la tarjeta
  const pie = crearElemento("footer", "card-footer bg-transparent d-flex justify-content-between small text-secondary");
  const barrio = crearElemento("span");
  barrio.append(crearIcono("bi-geo-alt"), BARRIOS[reporte.barrio]);
  const fecha = crearElemento("time");
  fecha.setAttribute("datetime", reporte.fecha);
  fecha.append(crearIcono("bi-calendar3"), formatearFecha(reporte.fecha));
  pie.append(barrio, fecha);

  // Armamos la tarjeta completa: columna > tarjeta > (cuerpo + pie)
  tarjeta.append(cuerpo, pie);
  columna.append(tarjeta);
  return columna;
}

// Dibuja en pantalla los reportes que cumplen con los filtros
function mostrarReportes(idNuevo = null) {
  const filtrados = obtenerReportesFiltrados();

  // Vaciamos el contenedor antes de volver a dibujar
  listaReportes.innerHTML = "";

  filtrados.forEach((reporte) => {
    listaReportes.append(crearTarjeta(reporte, reporte.id === idNuevo));
  });

  // Mensaje cuando no hay resultados
  mensajeVacio.classList.toggle("d-none", filtrados.length > 0);

  contadorResultados.textContent = `Mostrando ${filtrados.length} de ${reportes.length} reportes`;
}


/* ===== 6. FILTROS Y BÚSQUEDA ===== */

function obtenerReportesFiltrados() {
  const texto = normalizar(filtroBusqueda.value.trim());
  const categoria = filtroCategoria.value;
  const barrio = filtroBarrio.value;
  const estado = filtroEstado.value;

  // filter() devuelve solo los reportes que cumplen TODAS las condiciones.
  // Si un filtro está vacío ("Todos"), esa condición se cumple siempre.
  return reportes.filter((reporte) => {
    const coincideTexto = texto === "" ||
      normalizar(reporte.titulo).includes(texto) ||
      normalizar(reporte.direccion).includes(texto);
    const coincideCategoria = categoria === "" || reporte.categoria === categoria;
    const coincideBarrio = barrio === "" || reporte.barrio === barrio;
    const coincideEstado = estado === "" || reporte.estado === estado;

    return coincideTexto && coincideCategoria && coincideBarrio && coincideEstado;
  });
}

// Si se presiona Enter en el buscador, evitamos que la página se recargue
formFiltros.addEventListener("submit", (evento) => evento.preventDefault());

// Evento "input": se dispara con cada letra que se escribe
filtroBusqueda.addEventListener("input", () => mostrarReportes());

// Evento "change": se dispara al elegir una opción del select
[filtroCategoria, filtroBarrio, filtroEstado].forEach((filtro) => {
  filtro.addEventListener("change", () => mostrarReportes());
});

btnLimpiarFiltros.addEventListener("click", () => {
  filtroBusqueda.value = "";
  filtroCategoria.value = "";
  filtroBarrio.value = "";
  filtroEstado.value = "";
  mostrarReportes();
});

// Vuelve a los reportes de ejemplo (útil para hacer pruebas)
btnRestablecer.addEventListener("click", () => {
  const confirmado = confirm("¿Querés borrar los reportes cargados y volver a los de ejemplo?");
  if (!confirmado) return;

  reportes = [...REPORTES_INICIALES];
  guardarReportes();
  mostrarReportes();
  actualizarEstadisticas();
});


/* ===== 7. ESTADÍSTICAS AUTOMÁTICAS ===== */

// Cuenta cuántos reportes cumplen una condición
function contarPor(propiedad, valor) {
  return reportes.filter((reporte) => reporte[propiedad] === valor).length;
}

function actualizarEstadisticas() {
  // Tarjetas de resumen
  statTotal.textContent = reportes.length;
  statPendiente.textContent = contarPor("estado", "pendiente");
  statProceso.textContent = contarPor("estado", "en-proceso");
  statResuelto.textContent = contarPor("estado", "resuelto");

  // Tabla por categoría: una fila por cada categoría
  tablaCategorias.innerHTML = "";

  Object.keys(CATEGORIAS).forEach((clave) => {
    const fila = crearElemento("tr");
    const celdaNombre = crearElemento("td", "", CATEGORIAS[clave].nombre);
    const celdaCantidad = crearElemento("td", "text-end", String(contarPor("categoria", clave)));
    fila.append(celdaNombre, celdaCantidad);
    tablaCategorias.append(fila);
  });

  tablaTotal.textContent = reportes.length;
}


/* ===== 8. FORMULARIO DE NUEVO REPORTE ===== */

formulario.addEventListener("submit", (evento) => {
  // Evita que la página se recargue al enviar el formulario
  evento.preventDefault();

  // checkValidity() revisa los "required" del HTML.
  // La clase "was-validated" de Bootstrap pinta los campos en verde o rojo.
  if (!formulario.checkValidity()) {
    formulario.classList.add("was-validated");
    mostrarAlerta("Revisá los campos marcados en rojo.", "danger");
    return;
  }

  // Creamos el objeto del nuevo reporte con los valores del formulario
  const nuevoReporte = {
    id: Date.now(),  // número único basado en la fecha y hora
    titulo: formulario.titulo.value.trim(),
    descripcion: formulario.descripcion.value.trim(),
    categoria: formulario.categoria.value,
    barrio: formulario.barrio.value,
    direccion: formulario.direccion.value.trim(),
    estado: "pendiente",  // todo reporte nuevo empieza como pendiente
    fecha: fechaDeHoy(),
    tieneFoto: campoFoto.files.length > 0
  };

  // unshift() agrega al principio: el reporte nuevo aparece primero
  reportes.unshift(nuevoReporte);
  guardarReportes();

  // Limpiamos los filtros para que el reporte nuevo se vea
  btnLimpiarFiltros.click();
  mostrarReportes(nuevoReporte.id);
  actualizarEstadisticas();

  // Dejamos el formulario como estaba al principio
  formulario.reset();
  formulario.classList.remove("was-validated");
  actualizarContador();
  ocultarVistaPrevia();

  mostrarAlerta("¡Gracias! Tu reporte fue enviado y ya aparece en el listado.", "success");
});

// Muestra un mensaje (alert de Bootstrap) arriba del formulario
function mostrarAlerta(mensaje, tipo) {
  const icono = tipo === "success" ? "bi-check-circle-fill" : "bi-exclamation-triangle-fill";

  const alerta = crearElemento("div", `alert alert-${tipo} d-flex align-items-center`);
  alerta.setAttribute("role", "alert");
  alerta.append(crearIcono(`${icono} me-2`), mensaje);

  contenedorAlerta.innerHTML = "";
  contenedorAlerta.append(alerta);

  // El mensaje desaparece solo después de 5 segundos
  setTimeout(() => alerta.remove(), 5000);
}


/* ===== 9. CONTADOR DE CARACTERES Y VISTA PREVIA DE LA FOTO ===== */

function actualizarContador() {
  const cantidad = campoDescripcion.value.length;
  contadorCaracteres.textContent = `${cantidad}/${MAX_CARACTERES}`;
  // Se pone en rojo cuando faltan menos de 30 caracteres
  contadorCaracteres.classList.toggle("text-danger", cantidad > MAX_CARACTERES - 30);
}

campoDescripcion.addEventListener("input", actualizarContador);

campoFoto.addEventListener("change", () => {
  const archivo = campoFoto.files[0];

  if (!archivo) {
    ocultarVistaPrevia();
    return;
  }

  // Crea una dirección temporal para mostrar la imagen elegida
  imagenPrevia.src = URL.createObjectURL(archivo);
  vistaPrevia.classList.remove("d-none");
});

function ocultarVistaPrevia() {
  imagenPrevia.removeAttribute("src");
  vistaPrevia.classList.add("d-none");
}


/* ===== 10. NAVBAR: ENLACE ACTIVO Y CIERRE DEL MENÚ EN CELULAR ===== */

// Marca en el menú la sección que se está viendo
function marcarEnlaceActivo() {
  let seccionActual = "";

  secciones.forEach((seccion) => {
    // offsetTop: distancia desde el inicio de la página hasta la sección
    if (window.scrollY >= seccion.offsetTop - 120) {
      seccionActual = seccion.id;
    }
  });

  // Si llegamos al final de la página, marcamos la última sección
  // (a veces es tan corta que su título nunca llega arriba de todo)
  const llegoAlFinal = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
  if (llegoAlFinal) {
    seccionActual = secciones[secciones.length - 1].id;
  }

  enlacesMenu.forEach((enlace) => {
    const esActual = enlace.getAttribute("href") === `#${seccionActual}`;
    enlace.classList.toggle("active", esActual);
  });
}

// En celular, el menú se cierra solo al tocar una opción
enlacesMenu.forEach((enlace) => {
  enlace.addEventListener("click", () => {
    if (menuPrincipal.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menuPrincipal).hide();
    }
  });
});


/* ===== 11. BOTÓN "VOLVER ARRIBA" ===== */

function mostrarBotonArriba() {
  // Aparece después de bajar 400px
  btnArriba.classList.toggle("visible", window.scrollY > 400);
}

btnArriba.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Un solo evento "scroll" para las dos funciones que dependen del desplazamiento
window.addEventListener("scroll", () => {
  marcarEnlaceActivo();
  mostrarBotonArriba();
});


/* ===== 12. INICIO DE LA APLICACIÓN ===== */

mostrarReportes();
actualizarEstadisticas();
actualizarContador();
marcarEnlaceActivo();
