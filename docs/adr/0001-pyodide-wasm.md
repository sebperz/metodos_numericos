# Ejecucion Python en el navegador via Pyodide/WASM

El software ejecuta codigo Python del lado del cliente usando Pyodide (CPython compilado a WebAssembly). No hay servidor backend. Cada Simulacion corre el codigo del Metodo en el navegador del usuario, con acceso a matplotlib para graficos.

**Por que**: un backend de Python (FastAPI/Flask) requeriria infraestructura de servidor, manejo de sesiones, sandboxing de codigo de usuario, y latencia de red. Pyodide elimina todo eso: el sitio es estatico, se hostea en GitHub Pages sin costo, y la ejecucion es instantanea.

**Alternativas consideradas**:

- **Backend FastAPI + worker pool**: mas control sobre el entorno Python, pero requiere infraestructura, tiene latencia de red, y necesita sandboxing. Descartado por complejidad operativa.
- **JupyterLite**: similar a Pyodide pero orientado a notebooks. Demasiado pesado para snippets individuales. Descartado por sobre-ingenieria.
- **Compilar a JavaScript (Transcrypt/Brython)**: no son CPython real, rompen librerias como NumPy/SciPy. Descartado por incompatibilidad.

**Consecuencias**: el tiempo de carga inicial es ~5-8 segundos (descarga de Pyodide + matplotlib). Las librerias disponibles estan limitadas a las que Pyodide empaqueta. No podemos usar librerias que requieran extensiones C nativas fuera del set de Pyodide.
