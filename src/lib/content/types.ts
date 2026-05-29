export interface ParametrosMetodo {
  funcion?: string
  intervalo?: [number, number]
  tolerancia?: number
  [key: string]: unknown
}

export interface MetodoFrontmatter {
  slug: string
  nombre: string
  capitulo: string
  parte: string
  descripcion: string
  parametros?: ParametrosMetodo
}

export interface MetodoData {
  slug: string
  nombre: string
  capitulo: string
  parte: string
  descripcion: string
  parametros: ParametrosMetodo
  codigo: string
  contenido: string
}
