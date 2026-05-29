import { describe, it, expect, vi } from 'vitest'
import type { PyodideRunner } from '$lib/pyodide/runner'

function createMockRunner(): PyodideRunner {
  let _loaded = false
  let _matplotlib = false
  return {
    get loaded() { return _loaded },
    get matplotlibCargado() { return _matplotlib },
    load: vi.fn(async () => { _loaded = true }),
    loadMatplotlib: vi.fn(async () => { _matplotlib = true }),
    run: vi.fn(async (code: string) => {
      if (!_loaded) throw new Error('Pyodide no esta cargado.')
      if (code.includes('error')) return { output: 'NameError: name x is not defined', plots: [] }
      return { output: code, plots: [] }
    }),
  }
}

describe('PyodideRunner', () => {
  it('expone loaded como false inicialmente', () => {
    const runner = createMockRunner()
    expect(runner.loaded).toBe(false)
    expect(runner.matplotlibCargado).toBe(false)
  })

  it('matplotlib no esta cargado inicialmente', () => {
    const runner = createMockRunner()
    expect(runner.matplotlibCargado).toBe(false)
  })

  it('loadMatplotlib carga el paquete', async () => {
    const runner = createMockRunner()
    await runner.load()
    await runner.loadMatplotlib()
    expect(runner.matplotlibCargado).toBe(true)
  })

  it('run devuelve output y plots', async () => {
    const runner = createMockRunner()
    await runner.load()
    const result = await runner.run('print("hola")')
    expect(result.output).toBe('print("hola")')
    expect(result.plots).toEqual([])
  })
})
