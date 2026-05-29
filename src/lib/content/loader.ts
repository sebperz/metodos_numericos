import { parseMetodoFile } from './parser'
import type { MetodoData } from './types'

const modulos = import.meta.glob<{ default: string }>(
  '../../content/metodos/*.md',
  { query: '?raw', eager: true },
)

export function cargarMetodos(): MetodoData[] {
  const metodos: MetodoData[] = []

  for (const [, modulo] of Object.entries(modulos)) {
    try {
      const metodo = parseMetodoFile(modulo.default)
      metodos.push(metodo)
    } catch (e) {
      console.error('Error al cargar metodo:', e)
    }
  }

  return metodos.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}
