# ReportaYa 🚧

Sistema web para que los vecinos reporten problemas urbanos de su barrio (baches, luminarias rotas, basurales, pérdidas de agua) y puedan seguir el estado de cada reporte.

Proyecto de la materia **Programación IV**.

## Problemática

Los vecinos no tienen un canal simple para avisar al municipio sobre problemas en la vía pública, y cuando lo hacen no saben si alguien los atendió. ReportaYa centraliza los reportes y muestra su estado de forma transparente.

## Funcionalidades previstas

- Crear un reporte con categoría, descripción, dirección, barrio y foto.
- Ver el listado de reportes y filtrarlo por categoría, barrio y estado.
- Ver el detalle de cada reporte.
- Panel del municipio para cambiar el estado: Pendiente → En proceso → Resuelto.
- Estadísticas de reportes por estado y por categoría.

## Tecnologías

- HTML5
- Bootstrap
- JavaScript
- React
- JSON

## Organización de ramas

| Rama | Uso |
|------|-----|
| `main` | Versión estable y entregada |
| `dev` | Rama principal de desarrollo |
| `feature/*` | Nuevas funcionalidades |
| `fix/*` | Corrección de errores |
| `refactor/*` | Mejoras de código sin cambiar el funcionamiento |
| `docs/*` | Documentación |

Cada rama se crea desde `dev` y se integra mediante un Pull Request hacia `dev`.

## Convención de commits

- `feat:` nueva funcionalidad
- `fix:` corrección de un error
- `refactor:` reorganización del código
- `docs:` cambios en documentación

Ejemplo: `feat: agrega formulario de nuevo reporte`

## Cómo ver el proyecto

Clonar el repositorio y abrir `index.html` en el navegador.

## Autora

Lourdes
