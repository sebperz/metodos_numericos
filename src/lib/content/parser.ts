import type { MetodoData, MetodoFrontmatter, ParametrosMetodo } from './types'

const CAMPOS_OBLIGATORIOS: (keyof MetodoFrontmatter)[] = [
  'slug',
  'nombre',
  'capitulo',
  'parte',
  'descripcion',
]

function splitFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const trimmed = raw.trimStart()
  if (!trimmed.startsWith('---')) {
    throw new Error('El archivo de metodo debe comenzar con frontmatter YAML (---)')
  }

  const endIdx = trimmed.indexOf('---', 3)
  if (endIdx === -1) {
    throw new Error('Falta el delimitador de cierre --- en el frontmatter')
  }

  const yaml = trimmed.slice(3, endIdx)
  const content = trimmed.slice(endIdx + 3).trimStart()

  return { data: parseYamlSimple(yaml), content }
}

function parseYamlSimple(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const lines = yaml.split('\n')
  let currentKey = ''
  let currentIndent = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trimEnd()

    if (!trimmed || trimmed.startsWith('#')) continue

    const indent = line.search(/\S/)
    const kvMatch = trimmed.match(/^([\w_-]+)\s*:\s*(.*)$/)
    if (!kvMatch) continue

    const key = kvMatch[1]
    const rawValue = kvMatch[2] || ''

    if (indent === 0) {
      currentKey = key
      currentIndent = 0

      if (key === 'descripcion' && rawValue === '>' && i + 1 < lines.length) {
        const nextLine = lines[i + 1]
        const nextIndent = nextLine.search(/\S/)
        const value = extractIndentedString(lines, i + 1, nextIndent)
        result[key] = value
        i += countIndentedLines(lines, i + 1, nextIndent)
      } else if (rawValue) {
        result[key] = parseYamlValue(rawValue)
      } else if (i + 1 < lines.length) {
        const nextLine = lines[i + 1]
        const nextIndent = nextLine.search(/\S/)
        if (nextIndent > 0) {
          result[key] = parseIndentedObject(lines, i + 1, nextIndent)
          i += countLinesUntil(lines, i + 1, nextIndent)
        } else {
          result[key] = ''
        }
      } else {
        result[key] = ''
      }
    }
  }

  return result
}

function extractIndentedString(lines: string[], start: number, baseIndent: number): string {
  const parts: string[] = []
  let i = start
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    const indent = line.search(/\S/)
    if (indent < baseIndent) break
    parts.push(line.trim())
    i++
  }
  return parts.join(' ')
}

function countIndentedLines(lines: string[], start: number, baseIndent: number): number {
  let count = 0
  for (let i = start; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) { count++; continue }
    const indent = line.search(/\S/)
    if (indent < baseIndent) break
    count++
  }
  return Math.max(count - 1, 0)
}

function countLinesUntil(lines: string[], start: number, baseIndent: number): number {
  let count = 0
  for (let i = start; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) { count++; continue }
    const indent = line.search(/\S/)
    if (indent < baseIndent) break
    count++
  }
  return Math.max(count - 1, 0)
}

function parseIndentedObject(lines: string[], start: number, baseIndent: number): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (let i = start; i < lines.length; i++) {
    const line = lines[i]
    if (!line.trim()) continue
    const indent = line.search(/\S/)
    if (indent < baseIndent) break

    const kvMatch = line.trim().match(/^([\w_-]+)\s*:\s*(.*)$/)
    if (!kvMatch) continue
    result[kvMatch[1]] = parseYamlValue(kvMatch[2])
  }
  return result
}

function parseYamlValue(raw: string): unknown {
  let v = raw.trim()

  if (v === 'true') return true
  if (v === 'false') return false
  if (v === 'null' || v === '~') return null

  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1)
    return v
  }

  if (v.startsWith('[') && v.endsWith(']')) {
    return v.slice(1, -1).split(',').map(s => parseYamlValue(s))
  }

  const num = Number(v)
  if (!isNaN(num) && v !== '') return num

  return v
}

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
    parametros: (data.parametros as ParametrosMetodo) ?? undefined,
  }
}

export function parseMetodoFile(raw: string): MetodoData {
  const { data, content } = splitFrontmatter(raw)
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
