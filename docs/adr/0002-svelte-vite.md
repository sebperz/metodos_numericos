# Svelte + Vite como stack de frontend

La UI del software se construye con Svelte 5 y Vite como bundler/dev server. Se eligio Svelte sobre React (la opcion mas popular) por tres razones: menor tamano de bundle (importante porque Pyodide ya es pesado), sintaxis mas simple para un proyecto educativo, y reactividad por compilador sin virtual DOM.

**Alternativas consideradas**:

- **React + Vite**: ecosistema mas grande, Monaco editor tiene wrapper oficial. Pero el bundle es mas grande, la curva de aprendizaje es mayor, y el virtual DOM agrega overhead innecesario para una SPA de este tipo.
- **Vue + Vite**: buen punto medio, pero la sintaxis de templates es menos directa que Svelte para binding reactivo simple.
- **Vanilla JS + Vite**: minimo overhead, pero sin componentes reactivos se vuelve caotico a medida que crece la UI.

**Consecuencias**: el ecosistema de componentes Svelte es mas chico que el de React. CodeMirror 6 se integra via vanilla JS (no hay wrapper oficial de Svelte, pero funciona igual). shadcn-svelte cubre los componentes de UI base.
