import { loadPyodide, type PyodideInterface } from 'pyodide'

export interface PyodideRunner {
  readonly loaded: boolean
  readonly matplotlibCargado: boolean
  load(): Promise<void>
  loadMatplotlib(): Promise<void>
  run(code: string): Promise<string>
}

export function createPyodideRunner(): PyodideRunner {
  let pyodide: PyodideInterface | null = null
  let loaded = false
  let matplotlibCargado = false

  const preamble = `
import matplotlib
matplotlib.use("module://matplotlib_pyodide.html5_canvas_backend")
matplotlib.rcParams["figure.figsize"] = (8, 5)
`

  return {
    get loaded() {
      return loaded
    },

    get matplotlibCargado() {
      return matplotlibCargado
    },

    async load(): Promise<void> {
      if (loaded) return
      const indexURL = typeof window !== 'undefined'
        ? 'https://cdn.jsdelivr.net/pyodide/v0.29.4/full/'
        : undefined
      pyodide = await loadPyodide({ indexURL })
      loaded = true
    },

    async loadMatplotlib(): Promise<void> {
      if (!pyodide || !loaded) {
        throw new Error('Pyodide no esta cargado. Llama a load() primero.')
      }
      if (matplotlibCargado) return
      await pyodide.loadPackage('matplotlib')
      await pyodide.runPythonAsync(preamble)
      matplotlibCargado = true
    },

    async run(code: string): Promise<string> {
      if (!pyodide || !loaded) {
        throw new Error('Pyodide no esta cargado. Llama a load() primero.')
      }

      const output: string[] = []
      const errors: string[] = []

      pyodide.setStdout({ batched: (msg: string) => output.push(msg) })
      pyodide.setStderr({ batched: (msg: string) => errors.push(msg) })

      try {
        await pyodide.runPythonAsync(
          `import matplotlib.pyplot as _mpl_plt\n_mpl_plt.close("all")\n${code}`,
        )
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        errors.push(msg)
      }

      if (errors.length > 0) {
        return errors.join('\n')
      }
      return output.join('\n') || 'Sin salida.'
    },
  }
}
