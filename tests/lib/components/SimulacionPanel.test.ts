import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import SimulacionPanel from '../../../src/lib/components/SimulacionPanel.svelte'
import type { PyodideRunner } from '$lib/pyodide/runner'
import type { MetodoData } from '$lib/content/types'

const metodo: MetodoData = {
  slug: 'biseccion',
  nombre: 'Biseccion',
  capitulo: 'raices-de-ecuaciones',
  parte: 'raices-y-optimizacion',
  descripcion: 'Encuentra raices dividiendo el intervalo.',
  parametros: {
    funcion: 'x**2 - 4',
    intervalo: [-10, 10],
    tolerancia: 0.0001,
  },
  codigo: 'def biseccion(f, a, b, tol=1e-6):\n    pass',
  contenido: '# Biseccion\n\nContenido markdown.',
}

function createMockRunner(): PyodideRunner {
  return {
    loaded: true,
    matplotlibCargado: true,
    load: vi.fn().mockResolvedValue(undefined),
    loadMatplotlib: vi.fn().mockResolvedValue(undefined),
    run: vi.fn().mockResolvedValue('Raiz encontrada: 2.0'),
  }
}

describe('SimulacionPanel', () => {
  it('muestra el nombre del metodo', () => {
    const runner = createMockRunner()
    render(SimulacionPanel, { runner, metodo })
    expect(screen.getByText('Biseccion')).toBeInTheDocument()
  })

  it('muestra el boton de ejecutar', () => {
    const runner = createMockRunner()
    render(SimulacionPanel, { runner, metodo })
    expect(screen.getByRole('button', { name: /ejecutar/i })).toBeInTheDocument()
  })

  it('ejecuta el codigo y muestra el resultado', async () => {
    const runner = createMockRunner()
    render(SimulacionPanel, { runner, metodo })

    const button = screen.getByRole('button', { name: /ejecutar/i })
    await fireEvent.click(button)

    expect(runner.run).toHaveBeenCalledWith(metodo.codigo)
    expect(await screen.findByText('Raiz encontrada: 2.0')).toBeInTheDocument()
  })

  it('muestra estado de carga si Pyodide no esta listo', () => {
    const runner: PyodideRunner = {
      loaded: false,
      matplotlibCargado: false,
      load: vi.fn(),
      loadMatplotlib: vi.fn(),
      run: vi.fn(),
    }
    render(SimulacionPanel, { runner, metodo })
    expect(screen.getByText(/cargando/i)).toBeInTheDocument()
  })

  it('tiene un canvas para graficos', () => {
    const runner = createMockRunner()
    render(SimulacionPanel, { runner, metodo })
    expect(document.querySelector('canvas')).toBeInTheDocument()
  })
})
