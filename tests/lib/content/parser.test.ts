import { describe, it, expect } from 'vitest'
import { parseMetodoFile } from '$lib/content/parser'

const muestraBiseccion = `---
slug: biseccion
nombre: Biseccion
capitulo: raices-de-ecuaciones
parte: raices-y-optimizacion
descripcion: >
  Encuentra raices dividiendo repetidamente el intervalo a la mitad.
parametros:
  funcion: "x**2 - 4"
  intervalo: [-10, 10]
  tolerancia: 0.0001
---

# Biseccion

El metodo de biseccion es un algoritmo de busqueda de raices.

\`\`\`python
def biseccion(f, a, b, tol=1e-6):
    while (b - a) / 2 > tol:
        c = (a + b) / 2
        if f(c) == 0:
            return c
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    return (a + b) / 2
\`\`\`

Ver tambien: Newton-Raphson.
`

describe('parseMetodoFile', () => {
  it('extrae el slug del frontmatter', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.slug).toBe('biseccion')
  })

  it('extrae el nombre del frontmatter', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.nombre).toBe('Biseccion')
  })

  it('extrae el capitulo y la parte', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.capitulo).toBe('raices-de-ecuaciones')
    expect(result.parte).toBe('raices-y-optimizacion')
  })

  it('extrae los parametros con sus valores', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.parametros.funcion).toBe('x**2 - 4')
    expect(result.parametros.intervalo).toEqual([-10, 10])
    expect(result.parametros.tolerancia).toBe(0.0001)
  })

  it('extrae el codigo Python del bloque de codigo', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.codigo).toContain('def biseccion(f, a, b, tol=1e-6):')
    expect(result.codigo).toContain('return (a + b) / 2')
  })

  it('extrae el contenido de la descripcion', () => {
    const result = parseMetodoFile(muestraBiseccion)
    expect(result.descripcion).toContain('Encuentra raices')
  })

  it('devuelve parametros vacios si no estan definidos', () => {
    const minimal = `---
slug: test
nombre: Test
capitulo: test
parte: test
descripcion: Test method
---
# Test
\`\`\`python
print("hello")
\`\`\`
`
    const result = parseMetodoFile(minimal)
    expect(result.parametros).toEqual({})
  })

  it('lanza error si falta un campo obligatorio del frontmatter', () => {
    const sinSlug = `---
nombre: Test
capitulo: test
parte: test
descripcion: Test
---
# Test
\`\`\`python
pass
\`\`\`
`
    expect(() => parseMetodoFile(sinSlug)).toThrow('slug')
  })
})
