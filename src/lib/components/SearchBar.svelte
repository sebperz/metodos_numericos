<script lang="ts">
  import Fuse from 'fuse.js'
  import { Input } from '$lib/components/ui/input'
  import type { MetodoData } from '$lib/content/types'

  let {
    metodos,
    onselect,
  }: {
    metodos: MetodoData[]
    onselect?: (slug: string) => void
  } = $props()

  let busqueda = $state('')

  const fuse = $derived(
    new Fuse(metodos, {
      keys: ['nombre', 'descripcion', 'capitulo'],
      threshold: 0.4,
      distance: 100,
    }),
  )

  const resultados = $derived(
    busqueda.trim() ? fuse.search(busqueda).slice(0, 10).map((r) => r.item) : [],
  )

  function seleccionar(slug: string) {
    busqueda = ''
    onselect?.(slug)
  }
</script>

<div class="relative">
  <Input
    type="text"
    bind:value={busqueda}
    placeholder="Buscar metodo..."
    class="w-full"
  />
  {#if busqueda.trim()}
    <ul class="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg z-10 list-none p-1 mt-1 max-h-[300px] overflow-y-auto">
      {#each resultados as metodo (metodo.slug)}
        <li>
          <button
            class="flex flex-col w-full text-left px-3 py-2 rounded-sm hover:bg-accent cursor-pointer border-none bg-transparent text-sm"
            onclick={() => seleccionar(metodo.slug)}
          >
            <span class="font-medium">{metodo.nombre}</span>
            <span class="text-xs text-muted-foreground">{metodo.capitulo}</span>
          </button>
        </li>
      {:else}
        <li class="px-3 py-2 text-muted-foreground text-sm text-center">Sin resultados</li>
      {/each}
    </ul>
  {/if}
</div>
