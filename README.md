# ReportaYa 🚧

## Integrantes

- Lourdes

## Descripción

ReportaYa es un sistema web para que los vecinos reporten problemas urbanos de su barrio (baches, luminarias rotas, basurales, pérdidas de agua) y puedan seguir el estado de cada reporte: pendiente, en proceso o resuelto.

**Problemática:** los vecinos no tienen un canal simple para avisar al municipio sobre problemas en la vía pública, y cuando lo hacen no saben si alguien los atendió. ReportaYa centraliza los reportes y muestra su estado de forma transparente.

Proyecto de la materia **Programación IV**.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (Flexbox, Grid, variables, media queries)
- Google Fonts (Poppins e Inter)
- Git y GitHub
- Próximamente: Bootstrap, JavaScript, React y JSON

## Estructura del proyecto

```
reportes-urbanos/
├── .github/
│   └── pull_request_template.md
├── img/
│   ├── hero.svg
│   └── logo.svg
├── index.html
├── style.css
├── robots.txt
├── sitemap.xml
└── README.md
```

## ¿Dónde utilizamos Flexbox?

- **Encabezado** (`.encabezado__contenido`): ubica el logo y el menú. En celular van uno debajo del otro (`flex-direction: column`) y desde tablet en fila (`row` con `space-between`).
- **Menú** (`.menu__lista`): enlaces en fila con `flex-wrap: wrap` para que pasen de línea si no entran.
- **Sección Inicio** (`.inicio__contenido`): texto e imagen apilados en celular y lado a lado en computadora.
- **Filtros de reportes** (`.filtros`): cada filtro usa `flex: 1 1 200px` para repartirse el espacio.
- **Tarjetas de reportes** (`.tarjeta`, `.tarjeta__cabecera`, `.tarjeta__pie`): alinea la etiqueta con el estado y empuja el pie hacia abajo.
- **Pie de página** (`.pie__contenido`).

## ¿Dónde utilizamos Grid?

- **Cómo funciona** (`.pasos`): 1 columna en celular y 3 columnas desde tablet.
- **Formulario** (`.formulario`): 1 columna en celular y 2 en tablet; algunos campos ocupan el ancho completo con `grid-column: 1 / -1`.
- **Listado de reportes** (`.reportes`): 1, 2 o 3 tarjetas por fila según el dispositivo.
- **Estadísticas** (`.estadisticas`): 2 columnas en celular y 4 desde tablet con `repeat(4, 1fr)`.

## ¿Qué variables CSS creamos?

Se definen en `:root` y se usan con `var()`:

| Tipo | Variables |
|------|-----------|
| Colores principales | `--color-primario`, `--color-acento`, `--color-acento-oscuro` |
| Fondos y texto | `--color-fondo`, `--color-fondo-claro`, `--color-texto`, `--color-texto-suave`, `--color-borde` |
| Estados de reportes | `--color-pendiente`, `--color-proceso`, `--color-resuelto` |
| Tipografías | `--fuente-titulos`, `--fuente-texto` |
| Espaciados | `--espacio-xs`, `--espacio-sm`, `--espacio-md`, `--espacio-lg` |
| Bordes y sombras | `--radio`, `--sombra`, `--sombra-fuerte` |
| Layout | `--ancho-maximo` |

## ¿Cómo implementamos el Responsive Design?

- **Mobile first:** los estilos base están pensados para celular y luego se amplían.
- **Meta viewport** en el HTML para que el navegador respete el ancho del dispositivo.
- **Media queries:**
  - `@media (min-width: 768px)` → tablet: menú en fila, formulario en 2 columnas, 2 tarjetas por fila, estadísticas en 4 columnas.
  - `@media (min-width: 1024px)` → computadora: inicio con texto e imagen lado a lado, 3 tarjetas por fila.
- **Unidades flexibles:** `%` y `max-width` en el contenedor, `rem` en textos y espaciados, `vh` en el alto del inicio, `vw` en la imagen, `fr` en las columnas de Grid.
- Imágenes con `max-width: 100%` y tabla con `overflow-x: auto` para que nada se desborde.

## Estrategias de SEO aplicadas

| # | Estrategia | Implementación | Objetivo |
|---|-----------|----------------|----------|
| 1 | Título optimizado | `<title>` con el nombre y las palabras clave | Es el texto principal que muestra Google en los resultados |
| 2 | Meta description | `<meta name="description">` | Resume la página debajo del título y mejora los clics |
| 3 | HTML semántico y jerarquía de títulos | `header`, `nav`, `main`, `section`, `article`, `footer`; un solo `h1` y luego `h2`, `h3` | Ayuda al buscador a entender la estructura e importancia del contenido |
| 4 | Texto alternativo en imágenes | Atributo `alt` en todas las `img` | Permite que el buscador "entienda" las imágenes y mejora la accesibilidad |
| 5 | Open Graph | Etiquetas `og:title`, `og:description`, `og:image` | Controla cómo se ve el enlace al compartirlo en redes y WhatsApp |
| 6 | URL canónica y meta robots | `<link rel="canonical">` y `<meta name="robots">` | Evita contenido duplicado e indica que la página se puede indexar |
| 7 | robots.txt y sitemap.xml | Archivos en la raíz del proyecto | Guían a los buscadores sobre qué recorrer y qué páginas existen |
| 8 | Idioma y rendimiento | `lang="es"`, `width`/`height` en imágenes, `preconnect` a Google Fonts | Muestra el sitio a quien busca en español y mejora la velocidad de carga |

## Organización de ramas

| Rama | Uso |
|------|-----|
| `main` | Versión estable y entregada |
| `dev` | Rama principal de desarrollo |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de errores |
| `refactor/*` | Mejoras de código sin cambiar el funcionamiento |
| `docs/*` | Documentación |

Cada rama se crea desde `dev` y se integra mediante un Pull Request hacia `dev`. Al finalizar cada entrega, `dev` se integra en `main`.

## Convención de commits

- `feat:` nueva funcionalidad
- `fix:` corrección de un error
- `refactor:` reorganización del código
- `docs:` cambios en documentación
- `style:` cambios de estilos (CSS)

## Cómo ver el proyecto

Clonar el repositorio y abrir `index.html` en el navegador.
