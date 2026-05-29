---
slug: simpson
nombre: Simpson 1/3
capitulo: Integracion numerica
parte: Integracion y derivacion
descripcion: >
  Regla de Simpson 1/3 compuesta. Aproxima la integral con polinomios cuadraticos
  en cada par de subintervalos. Mayor precision que el trapecio para el mismo n.
parametros:
  funcion: "np.sin(x)"
  a: 0
  b: "np.pi"
  n: 20
---

# Regla de Simpson 1/3

La regla de Simpson 1/3 usa polinomios de grado 2 para aproximar la funcion
en cada par de subintervalos. Requiere que \(n\) sea par.

## Algoritmo

1. Dividir \([a, b]\) en \(n\) subintervalos (n debe ser par), \(h = (b-a)/n\)
2. \(\int_a^b f(x)dx \approx \frac{h}{3}[f(a) + 4\sum_{i,\text{impar}} f(x_i) + 2\sum_{i,\text{par}} f(x_i) + f(b)]\)

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def simpson_13(f, a, b, n):
    if n % 2 != 0:
        n += 1
    h = (b - a) / n
    x = np.linspace(a, b, n + 1)
    y = f(x)
    integral = h/3 * (y[0] + 4*np.sum(y[1:-1:2]) + 2*np.sum(y[2:-2:2]) + y[-1])
    return integral, x, y

f = lambda x: np.sin(x)
a, b = 0, np.pi
n = 20

integral, x_vals, y_vals = simpson_13(f, a, b, n)
valor_real = 2.0
print(f"Integral de sin(x) en [0, pi] = {integral:.8f}")
print(f"Valor real = {valor_real}")
print(f"Error Simpson = {abs(integral - valor_real):.2e}")

# Comparacion con trapecio
def trapecio(f, a, b, n):
    h = (b - a) / n
    x = np.linspace(a, b, n + 1)
    y = f(x)
    return h * (0.5*y[0] + np.sum(y[1:-1]) + 0.5*y[-1])

error_trap = abs(trapecio(f, a, b, n) - valor_real)
error_simp = abs(integral - valor_real)
print(f"Error Trapecio (n={n}) = {error_trap:.2e}")
print(f"Error Simpson  (n={n}) = {error_simp:.2e}")
print(f"Mejoria: {error_trap/error_simp:.0f}x mas preciso")

x = np.linspace(a, b, 300)
plt.figure(figsize=(8, 5))
plt.plot(x, f(x), 'steelblue', linewidth=2, label='sin(x)')
for i in range(0, n-1, 2):
    xi = np.linspace(x_vals[i], x_vals[i+2], 20)
    coef = np.polyfit(x_vals[i:i+3], y_vals[i:i+3], 2)
    yi = np.polyval(coef, xi)
    plt.fill_between(xi[:10], yi[:10], alpha=0.2, color='coral')
    plt.fill_between(xi[10:], yi[10:], alpha=0.2, color='coral')
plt.axhline(0, color='gray', linewidth=0.5)
plt.legend()
plt.title(f'Simpson 1/3 (n={n}): area ≈ {integral:.6f}')
plt.show()
```
