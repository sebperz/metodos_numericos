# Métodos Numéricos

Software interactivo para explorar métodos numéricos del libro de Chapra y Canale. El usuario navega por Partes y Capítulos, selecciona un Método, y accede a su Simulación interactiva donde puede editar código Python, modificar parámetros, ejecutar, y ver resultados numéricos y gráficos.

## Language

**Método**:
Un método numérico definido en el libro de Chapra y Canale (ej. Bisección, Newton-Raphson, Euler, Gauss-Seidel). El usuario navega el software por Método.
_Avoid_: algoritmo, técnica, procedimiento

**Capítulo**:
Agrupación de Métodos según el índice del libro (ej. "Raíces de ecuaciones", "Ecuaciones algebraicas lineales"). Un Capítulo contiene uno o más Métodos.
_Avoid_: sección, unidad, módulo

**Parte**:
Agrupación de alto nivel de Capítulos según la estructura del libro (ej. "Modelado, computadoras y análisis de error", "Raíces y optimización").
_Avoid_: sección

**Simulación**:
La vista interactiva de un Método donde el usuario edita el código Python, modifica parámetros, ejecuta el método, y ve resultados numéricos y/o gráficos (vía matplotlib). Cada Método tiene exactamente una Simulación.
_Avoid_: ejecución, demo, playground, laboratorio

**Archivo de Método**:
Un archivo Markdown con frontmatter YAML que define un Método. Contiene: slug, nombre, capítulo, parte, descripción, parámetros por defecto, y el código Python en un bloque de código. Es la fuente de contenido del software.
_Avoid_: receta, ficha, entrada

## Relationships

- Una **Parte** contiene uno o más **Capítulos**
- Un **Capítulo** contiene uno o más **Métodos**
- Un **Método** tiene una **Simulación**
- Un **Archivo de Método** define un **Método**

## Example dialogue

> **Dev:** "¿Dónde está el código que ejecuta el usuario en una Simulación?"
> **Domain expert:** "En el Archivo de Método. Cada Método tiene su archivo `.md` con el código Python en un bloque de código. La Simulación lo carga, se lo muestra al usuario en CodeMirror, y Pyodide lo ejecuta."
>
> **Dev:** "¿Y si quiero agregar el método de la Secante?"
> **Domain expert:** "Creás un Archivo de Método nuevo en `src/content/metodos/`, lo ponés en el Capítulo 'Raíces de ecuaciones' dentro de la Parte 'Raíces y optimización'. Automáticamente aparece en la navegación."

## Flagged ambiguities

- "algoritmo" fue usado para referirse a Método — resuelto: Método es el término canónico.
- "ejemplo" fue usado para referirse indistintamente al código o a la Simulación — resuelto: la Simulación es la experiencia interactiva completa; el código es parte del Archivo de Método.
