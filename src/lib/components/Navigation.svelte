<script lang="ts">
  import type { NavegableParte } from '$lib/content/navigation'

  let {
    partes,
    onselect,
  }: {
    partes: NavegableParte[]
    onselect?: (slug: string) => void
  } = $props()

  let expandidos: Record<string, boolean> = $state({})

  $effect(() => {
    const entries: Record<string, boolean> = {}
    for (const p of partes) {
      entries[p.slug] = true
      for (const c of p.capitulos) {
        entries[`${p.slug}/${c.slug}`] = true
      }
    }
    expandidos = entries
  })

  function toggle(key: string) {
    expandidos = { ...expandidos, [key]: !expandidos[key] }
  }

  let seleccionado = $state<string | null>(null)

  function seleccionar(slug: string) {
    seleccionado = slug
    onselect?.(slug)
  }
</script>

<nav class="text-sm">
  {#each partes as parte (parte.slug)}
    <div>
      <button
        class="flex items-center gap-1 w-full text-left px-2 py-1.5 rounded font-semibold hover:bg-accent border-none bg-transparent cursor-pointer"
        onclick={() => toggle(parte.slug)}
        aria-expanded={expandidos[parte.slug] ?? false}
      >
        <span class="text-xs w-4">{expandidos[parte.slug] ? '▾' : '▸'}</span>
        {parte.nombre}
      </button>

      {#if expandidos[parte.slug]}
        <div>
          {#each parte.capitulos as capitulo (capitulo.slug)}
            <div>
              <button
                class="flex items-center gap-1 w-full text-left pl-5 pr-2 py-1.5 rounded text-muted-foreground hover:bg-accent border-none bg-transparent cursor-pointer"
                onclick={() => toggle(`${parte.slug}/${capitulo.slug}`)}
                aria-expanded={expandidos[`${parte.slug}/${capitulo.slug}`] ?? false}
              >
                <span class="text-xs w-4">
                  {expandidos[`${parte.slug}/${capitulo.slug}`] ? '▾' : '▸'}
                </span>
                {capitulo.nombre}
              </button>

              {#if expandidos[`${parte.slug}/${capitulo.slug}`]}
                <div>
                  {#each capitulo.metodos as metodo (metodo.slug)}
                    <button
                      class="block w-full text-left pl-8 pr-2 py-1.5 rounded text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary border-none bg-transparent cursor-pointer {seleccionado === metodo.slug ? 'bg-primary/10 text-primary font-medium' : ''}"
                      onclick={() => seleccionar(metodo.slug)}
                    >
                      {metodo.nombre}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/each}
</nav>
