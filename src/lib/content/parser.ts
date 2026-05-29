import matter from 'gray-matter'
import type { MetodoData, MetodoFrontmatter } from './types'

const CAMPOS_OBLIGATORIOS: (keyof MetodoFrontmatter)[] = [
  'slug',
  'nombre',
  'capitulo',
  'parte',
  'descripcion',
]

function extraerCodigo(markdown: string): string {
  const match = markdown.match(/```python\n([\s\S]*?)```/)
  if (match?.[1]) {
    return match[1].trim()
  }
  return ''
}

function validarFrontmatter(data: Record<string, unknown>): MetodoFrontmatter {
  for (const campo of CAMPOS_OBLIGATORIOS) {
    if (!data[campo] || typeof data[campo] !== 'string') {
      throw new Error(`Falta el campo obligatorio '${campo}' en el frontmatter del metodo`)
    }
  }
  return {
    slug: data.slug as string,
    nombre: data.nombre as string,
    capitulo: data.capitulo as string,
    parte: data.parte as string,
    descripcion: data.descripcion as string,
    parametros: (data.parametros as MetodoFrontmatter['parametros']) ?? undefined,
  }
}

export function parseMetodoFile(raw: string): MetodoData {
  const { data, content } = matter(raw)
  const frontmatter = validarFrontmatter(data)

  return {
    slug: frontmatter.slug,
    nombre: frontmatter.nombre,
    capitulo: frontmatter.capitulo,
    parte: frontmatter.parte,
    descripcion: frontmatter.descripcion,
    parametros: frontmatter.parametros ?? {},
    codigo: extraerCodigo(content),
    contenido: content.trim(),
  }
}
