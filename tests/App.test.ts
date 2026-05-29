import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import App from '../src/App.svelte'

describe('App layout', () => {
  it('muestra el titulo de la aplicacion', () => {
    render(App)
    expect(screen.getByRole('heading', { name: /métodos numéricos/i })).toBeInTheDocument()
  })

  it('tiene una barra lateral para navegacion', () => {
    render(App)
    expect(document.querySelector('aside')).toBeInTheDocument()
  })

  it('tiene un area principal de contenido', () => {
    render(App)
    expect(document.querySelector('main')).toBeInTheDocument()
  })

  it('el layout tiene la estructura aside + main', () => {
    const { container } = render(App)
    const layout = container.querySelector('[data-testid="app-layout"]')
    expect(layout).toBeInTheDocument()
    expect(layout!.querySelector('aside')).toBeInTheDocument()
    expect(layout!.querySelector('main')).toBeInTheDocument()
  })
})
