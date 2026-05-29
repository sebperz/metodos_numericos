import type { MetodoData } from './types'

export interface GrupoMetodo {
  slug: string
  nombre: string
}

export interface NavegableCapitulo {
  slug: string
  nombre: string
  metodos: GrupoMetodo[]
}

export interface NavegableParte {
  slug: string
  nombre: string
  capitulos: NavegableCapitulo[]
}

function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function agruparMetodos(metodos: MetodoData[]): NavegableParte[] {
  const partesMap = new Map<string, NavegableParte>()

  for (const metodo of metodos) {
    const parteSlug = slugify(metodo.parte)
    const capSlug = slugify(metodo.capitulo)

    if (!partesMap.has(parteSlug)) {
      partesMap.set(parteSlug, {
        slug: parteSlug,
        nombre: metodo.parte,
        capitulos: [],
      })
    }

    const parte = partesMap.get(parteSlug)!
    let capitulo = parte.capitulos.find((c) => c.slug === capSlug)

    if (!capitulo) {
      capitulo = {
        slug: capSlug,
        nombre: metodo.capitulo,
        metodos: [],
      }
      parte.capitulos.push(capitulo)
    }

    capitulo.metodos.push({
      slug: metodo.slug,
      nombre: metodo.nombre,
    })
  }

  return Array.from(partesMap.values())
}
