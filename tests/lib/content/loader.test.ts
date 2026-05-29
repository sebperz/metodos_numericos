import { describe, it, expect } from 'vitest'
import { cargarMetodos } from '$lib/content/loader'

describe('cargarMetodos', () => {
  it('carga al menos el metodo de biseccion', () => {
    const metodos = cargarMetodos()
    expect(metodos.length).toBeGreaterThanOrEqual(1)
  })

  it('cada metodo cargado tiene los campos requeridos', () => {
    const metodos = cargarMetodos()
    for (const metodo of metodos) {
      expect(metodo.slug).toBeTruthy()
      expect(metodo.nombre).toBeTruthy()
      expect(metodo.capitulo).toBeTruthy()
      expect(metodo.parte).toBeTruthy()
      expect(metodo.descripcion).toBeTruthy()
      expect(metodo.codigo).toBeTruthy()
    }
  })

  it('el metodo biseccion se carga con los datos correctos', () => {
    const metodos = cargarMetodos()
    const biseccion = metodos.find((m) => m.slug === 'biseccion')
    expect(biseccion).toBeDefined()
    expect(biseccion!.nombre).toBe('Bisección')
    expect(biseccion!.capitulo).toBe('raices-de-ecuaciones')
    expect(biseccion!.codigo).toContain('def biseccion')
  })
})
