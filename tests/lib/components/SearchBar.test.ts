import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import SearchBar from '../../../src/lib/components/SearchBar.svelte'
import type { MetodoData } from '$lib/content/types'

const metodos: MetodoData[] = [
  {
    slug: 'biseccion',
    nombre: 'Biseccion',
    capitulo: 'raices',
    parte: 'raices',
    descripcion: 'Encuentra raices dividiendo el intervalo.',
    parametros: {},
    codigo: '',
    contenido: '',
  },
  {
    slug: 'newton-raphson',
    nombre: 'Newton-Raphson',
    capitulo: 'raices',
    parte: 'raices',
    descripcion: 'Metodo iterativo con derivada.',
    parametros: {},
    codigo: '',
    contenido: '',
  },
  {
    slug: 'gauss-seidel',
    nombre: 'Gauss-Seidel',
    capitulo: 'lineales',
    parte: 'lineales',
    descripcion: 'Resuelve sistemas de ecuaciones lineales.',
    parametros: {},
    codigo: '',
    contenido: '',
  },
]

describe('SearchBar', () => {
  it('muestra un campo de busqueda', () => {
    render(SearchBar, { metodos })
    expect(screen.getByPlaceholderText(/buscar/i)).toBeInTheDocument()
  })

  it('filtra metodos al escribir', async () => {
    render(SearchBar, { metodos })
    const input = screen.getByPlaceholderText(/buscar/i)
    await fireEvent.input(input, { target: { value: 'gauss' } })

    expect(screen.getByText('Gauss-Seidel')).toBeInTheDocument()
    expect(screen.queryByText('Biseccion')).not.toBeInTheDocument()
  })

  it('tolera errores de tipeo', async () => {
    render(SearchBar, { metodos })
    const input = screen.getByPlaceholderText(/buscar/i)
    await fireEvent.input(input, { target: { value: 'bisecion' } })

    expect(screen.getByText('Biseccion')).toBeInTheDocument()
  })

  it('emite onselect al hacer click en un resultado', async () => {
    const onSelect = vi.fn()
    render(SearchBar, { metodos, onselect: onSelect })
    const input = screen.getByPlaceholderText(/buscar/i)
    await fireEvent.input(input, { target: { value: 'newton' } })
    await fireEvent.click(screen.getByText('Newton-Raphson'))

    expect(onSelect).toHaveBeenCalledWith('newton-raphson')
  })

  it('oculta resultados cuando el campo esta vacio', async () => {
    render(SearchBar, { metodos })
    const input = screen.getByPlaceholderText(/buscar/i)
    await fireEvent.input(input, { target: { value: 'biseccion' } })
    expect(screen.getByText('Biseccion')).toBeInTheDocument()

    await fireEvent.input(input, { target: { value: '' } })
    expect(screen.queryByText('Biseccion')).not.toBeInTheDocument()
    expect(screen.queryByText('Gauss-Seidel')).not.toBeInTheDocument()
  })
})
