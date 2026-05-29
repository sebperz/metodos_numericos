import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import Navigation from '../../../src/lib/components/Navigation.svelte'
import type { NavegableParte } from '$lib/content/navigation'

const datos: NavegableParte[] = [
  {
    slug: 'raices-y-optimizacion',
    nombre: 'Raices y optimizacion',
    capitulos: [
      {
        slug: 'raices-de-ecuaciones',
        nombre: 'Raices de ecuaciones',
        metodos: [
          { slug: 'biseccion', nombre: 'Biseccion' },
          { slug: 'newton-raphson', nombre: 'Newton-Raphson' },
        ],
      },
    ],
  },
  {
    slug: 'ecuaciones-lineales',
    nombre: 'Ecuaciones lineales',
    capitulos: [
      {
        slug: 'gauss',
        nombre: 'Eliminacion de Gauss',
        metodos: [
          { slug: 'gauss-simple', nombre: 'Gauss simple' },
        ],
      },
    ],
  },
]

describe('Navigation', () => {
  it('muestra los nombres de las partes', () => {
    render(Navigation, { partes: datos })
    expect(screen.getByText('Raices y optimizacion')).toBeInTheDocument()
    expect(screen.getByText('Ecuaciones lineales')).toBeInTheDocument()
  })

  it('muestra los nombres de los capitulos', () => {
    render(Navigation, { partes: datos })
    expect(screen.getByText('Raices de ecuaciones')).toBeInTheDocument()
    expect(screen.getByText('Eliminacion de Gauss')).toBeInTheDocument()
  })

  it('muestra los nombres de los metodos', () => {
    render(Navigation, { partes: datos })
    expect(screen.getByText('Biseccion')).toBeInTheDocument()
    expect(screen.getByText('Newton-Raphson')).toBeInTheDocument()
    expect(screen.getByText('Gauss simple')).toBeInTheDocument()
  })

  it('emite el evento onselect al hacer click en un metodo', async () => {
    const onSelect = vi.fn()
    render(Navigation, { partes: datos, onselect: onSelect })

    const btn = screen.getByText('Biseccion')
    await fireEvent.click(btn)

    expect(onSelect).toHaveBeenCalledWith('biseccion')
  })
})
