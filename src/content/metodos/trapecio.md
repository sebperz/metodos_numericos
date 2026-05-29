---
slug: trapecio
nombre: Trapecio
capitulo: Integracion numerica
parte: Integracion y derivacion
descripcion: >
  Aproxima la integral definida usando la regla del trapecio compuesta.
  Divide el intervalo en n segmentos y suma el area de cada trapecio.
parametros:
  funcion: "np.sin(x)"
  a: 0
  b: "np.pi"
  n: 20
---

# Regla del Trapecio

La regla del trapecio aproxima la integral definida \(\int_a^b f(x)dx\) sumando
areas de trapecios formados por los puntos de la funcion.

## Algoritmo

1. Dividir \([a, b]\) en \(n\) subintervalos de ancho \(h = (b-a)/n\)
2. \(\int_a^b f(x)dx \approx \frac{h}{2}[f(a) + 2\sum_{i=1}^{n-1} f(x_i) + f(b)]\)

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def trapecio(f, a, b, n):
    h = (b - a) / n
    x = np.linspace(a, b, n + 1)
    y = f(x)
    integral = h * (0.5*y[0] + np.sum(y[1:-1]) + 0.5*y[-1])
    return integral, x, y

f = lambda x: np.sin(x)
a, b = 0, np.pi
n = 20

integral, x_vals, y_vals = trapecio(f, a, b, n)
valor_real = 2.0
print(f"Integral de sin(x) en [0, pi] = {integral:.8f}")
print(f"Valor real = {valor_real}")
print(f"Error = {abs(integral - valor_real):.2e}")

x = np.linspace(a, b, 300)
plt.figure(figsize=(9, 5))
plt.plot(x, f(x), 'b-', label='f(x) = sin(x)')
plt.fill_between(x_vals, y_vals, alpha=0.3, label=f'Trapecios (n={n})')
plt.bar(x_vals[:-1], y_vals[:-1], width=(b-a)/n, align='edge',
        alpha=0.2, color='steelblue', edgecolor='navy', linewidth=0.5)
plt.axhline(0, color='gray', linewidth=0.5)
plt.legend()
plt.title(f'Regla del Trapecio (n={n}): area ≈ {integral:.4f}')
plt.show()
```
