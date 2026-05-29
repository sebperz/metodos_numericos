<script lang="ts">
  import { onMount } from 'svelte'
  import { createPyodideRunner } from '$lib/pyodide/runner'
  import { cargarMetodos } from '$lib/content/loader'
  import { agruparMetodos } from '$lib/content/navigation'
  import type { MetodoData } from '$lib/content/types'
  import Navigation from '$lib/components/Navigation.svelte'
  import SearchBar from '$lib/components/SearchBar.svelte'
  import SimulacionPanel from '$lib/components/SimulacionPanel.svelte'

  const runner = createPyodideRunner()
  const metodos = cargarMetodos()
  const partes = agruparMetodos(metodos)

  let metodoSeleccionado = $state<MetodoData | null>(null)

  function seleccionarMetodo(slug: string) {
    metodoSeleccionado = metodos.find((m) => m.slug === slug) ?? null
  }

  onMount(() => {
    runner.load()
  })
</script>

<div class="flex min-h-screen" data-testid="app-layout">
  <aside class="w-[300px] border-r p-4 flex flex-col gap-4 overflow-y-auto">
    <h1 class="text-lg font-semibold pb-3 border-b">Métodos Numéricos</h1>
    <SearchBar {metodos} onselect={seleccionarMetodo} />
    <Navigation partes={partes} onselect={seleccionarMetodo} />
  </aside>
  <main class="flex-1 p-8">
    {#if metodoSeleccionado}
      <SimulacionPanel {runner} metodo={metodoSeleccionado} />
    {:else}
      <p class="text-muted-foreground italic">Selecciona un metodo del panel lateral para comenzar.</p>
    {/if}
  </main>
</div>
