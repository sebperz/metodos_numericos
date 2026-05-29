import { loadPyodide, type PyodideInterface } from 'pyodide'

export interface PyodideRunResult {
  output: string
  plots: string[]
}

export interface PyodideRunner {
  readonly loaded: boolean
  readonly matplotlibCargado: boolean
  load(): Promise<void>
  loadMatplotlib(): Promise<void>
  run(code: string): Promise<PyodideRunResult>
}

function capturePlotsCode(): string {
  return `
import io, base64, json
import matplotlib.pyplot as _mpl_plt
_plots_json = []
for _fn in _mpl_plt.get_fignums():
    _fig = _mpl_plt.figure(_fn)
    _buf = io.BytesIO()
    _fig.savefig(_buf, format='png', dpi=100, bbox_inches='tight')
    _buf.seek(0)
    _plots_json.append(base64.b64encode(_buf.read()).decode())
_mpl_plt.close('all')
__plots_result__ = json.dumps(_plots_json)
`
}

export function createPyodideRunner(): PyodideRunner {
  let pyodide: PyodideInterface | null = null
  let loaded = false
  let matplotlibCargado = false

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
      matplotlibCargado = true
    },

    async run(code: string): Promise<PyodideRunResult> {
      if (!pyodide || !loaded) {
        throw new Error('Pyodide no esta cargado. Llama a load() primero.')
      }

      const output: string[] = []
      const errors: string[] = []

      pyodide.setStdout({ batched: (msg: string) => output.push(msg) })
      pyodide.setStderr({ batched: (msg: string) => errors.push(msg) })

      const fullCode = `
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
plt.rcParams['figure.figsize'] = (8, 5)

${code}

${capturePlotsCode()}
`

      try {
        await pyodide.runPythonAsync(fullCode)
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e)
        errors.push(msg)
      }

      if (errors.length > 0) {
        return { output: errors.join('\n'), plots: [] }
      }

      const plotsJson = pyodide.globals.get('__plots_result__') ?? '[]'
      const plots: string[] = JSON.parse(plotsJson as string)

      return {
        output: output.join('\n') || 'Sin salida.',
        plots,
      }
    },
  }
}
