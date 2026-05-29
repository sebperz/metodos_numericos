<script lang="ts">
  import { onMount } from 'svelte'
  import { EditorView, basicSetup } from 'codemirror'
  import { EditorState } from '@codemirror/state'
  import { python } from '@codemirror/lang-python'
  import { oneDark } from '@codemirror/theme-one-dark'
  import { Button } from '$lib/components/ui/button'
  import type { PyodideRunner } from '$lib/pyodide/runner'
  import type { MetodoData } from '$lib/content/types'

  let {
    runner,
    metodo,
  }: {
    runner: PyodideRunner
    metodo: MetodoData
  } = $props()

  let editorContainer = $state<HTMLDivElement>()
  let editorView: EditorView | null = null
  let output = $state('')
  let plots = $state<string[]>([])
  let ejecutando = $state(false)
  let cargandoPlot = $state(false)
  let plotError = $state('')

  function getCode(): string {
    if (editorView) return editorView.state.doc.toString()
    return metodo.codigo
  }

  async function cargarMatplotlib() {
    if (!runner.loaded || runner.matplotlibCargado) return
    cargandoPlot = true
    plotError = ''
    try {
      await runner.loadMatplotlib()
    } catch (e) {
      plotError = e instanceof Error ? e.message : 'Error al cargar matplotlib'
    } finally {
      cargandoPlot = false
    }
  }

  async function ejecutar() {
    if (!runner.loaded) return
    ejecutando = true
    try {
      if (!runner.matplotlibCargado) await cargarMatplotlib()
      const result = await runner.run(getCode())
      output = result.output
      plots = result.plots
    } finally {
      ejecutando = false
    }
  }

  onMount(() => {
    if (!editorContainer) return
    const state = EditorState.create({
      doc: metodo.codigo,
      extensions: [basicSetup, python(), oneDark],
    })
    editorView = new EditorView({ state, parent: editorContainer })
    return () => editorView?.destroy()
  })

  $effect(() => {
    if (runner.loaded && !runner.matplotlibCargado) cargarMatplotlib()
  })
</script>

{#if !runner.loaded}
  <div class="flex flex-col gap-4">
    <p class="text-muted-foreground italic">Cargando Pyodide...</p>
  </div>
{:else}
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-semibold">{metodo.nombre}</h2>
    <p class="text-muted-foreground">{metodo.descripcion}</p>

    <div bind:this={editorContainer} class="border rounded-lg overflow-hidden min-h-[200px]"></div>

    <div class="flex gap-2">
      <Button onclick={ejecutar} disabled={ejecutando || cargandoPlot}>
        {ejecutando ? 'Ejecutando...' : cargandoPlot ? 'Cargando matplotlib...' : 'Ejecutar'}
      </Button>
    </div>

    {#if plotError}
      <p class="text-destructive text-sm">{plotError}</p>
    {/if}

    {#if output}
      <pre class="bg-muted border rounded-lg p-3 font-mono text-sm whitespace-pre-wrap max-h-[300px] overflow-y-auto">{output}</pre>
    {/if}

    {#each plots as plot (plot.slice(0, 20))}
      <img src="data:image/png;base64,{plot}" alt="Grafico" class="w-full border rounded-lg" />
    {/each}
  </div>
{/if}
