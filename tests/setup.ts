import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('pyodide', () => ({
  loadPyodide: vi.fn().mockResolvedValue(undefined),
}))
