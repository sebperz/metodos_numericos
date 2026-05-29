---
slug: newton-raphson
nombre: Newton-Raphson
capitulo: Raices de ecuaciones
parte: Raices y optimizacion
descripcion: >
  Encuentra raices de una funcion usando la recta tangente en cada punto.
  Requiere la derivada de la funcion. Convergencia cuadratica cerca de la raiz.
parametros:
  funcion: "x**2 - 4"
  derivada: "2*x"
  x0: 5
  tolerancia: 0.0001
---

# Newton-Raphson

El metodo de Newton-Raphson utiliza la expansion en serie de Taylor para aproximar la raiz.
En cada iteracion, la aproximacion mejora cuadraticamente si el valor inicial esta
suficientemente cerca de la raiz.

## Algoritmo

1. Elegir un valor inicial \(x_0\)
2. Calcular \(x_{i+1} = x_i - \frac{f(x_i)}{f'(x_i)}\)
3. Si \(|f(x_{i+1})| < \text{tolerancia}\), terminar
4. Repetir desde el paso 2

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def newton_raphson(f, df, x0, tol=1e-6, max_iter=100):
    x = x0
    iteraciones = [x]
    for _ in range(max_iter):
        x_nuevo = x - f(x) / df(x)
        iteraciones.append(x_nuevo)
        if abs(f(x_nuevo)) < tol:
            break
        x = x_nuevo
    return x_nuevo, iteraciones

f = lambda x: x**2 - 4
df = lambda x: 2*x

raiz, iters = newton_raphson(f, df, x0=5, tol=1e-6)
print(f"Raiz encontrada: {raiz:.6f}")
print(f"f(raiz) = {f(raiz):.2e}")
print(f"Iteraciones: {len(iters)}")

x = np.linspace(-5, 5, 200)
plt.figure(figsize=(8, 5))
plt.plot(x, f(x), label='f(x) = x^2 - 4')
plt.axhline(0, color='gray', linewidth=0.5)
plt.scatter(iters, [f(xi) for xi in iters], color='red', zorder=5, label='Iteraciones')
plt.axvline(raiz, color='red', linestyle='--', alpha=0.5)
plt.legend()
plt.grid(True)
plt.title('Newton-Raphson: convergencia')
plt.show()
```
