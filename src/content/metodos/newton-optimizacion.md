---
slug: newton-optimizacion
nombre: Newton (Optimizacion)
capitulo: Optimizacion univariable
parte: Raices y optimizacion
descripcion: >
  Encuentra el optimo de una funcion usando la primera y segunda derivada.
  Convergencia cuadratica cerca del optimo. Version para optimizacion del metodo de Newton.
parametros:
  funcion: "(x-3)**2 + 2"
  x0: 0
  tolerancia: 0.0001
---

# Metodo de Newton para Optimizacion

El metodo de Newton aplicado a optimizacion busca puntos donde la derivada se anula.
Itera \(x_{i+1} = x_i - \frac{f'(x_i)}{f''(x_i)}\) para encontrar el optimo.

## Algoritmo

1. Elegir \(x_0\)
2. Calcular \(x_{i+1} = x_i - \frac{f'(x_i)}{f''(x_i)}\)
3. Si \(|f'(x_{i+1})| < \text{tolerancia}\), terminar
4. Repetir

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def newton_opt(df, d2f, x0, tol=1e-6, max_iter=100):
    x = x0
    iteraciones = [x]
    for _ in range(max_iter):
        x_nuevo = x - df(x) / d2f(x)
        iteraciones.append(x_nuevo)
        if abs(df(x_nuevo)) < tol:
            break
        x = x_nuevo
    return x_nuevo, iteraciones

f = lambda x: (x - 3)**2 + 2
df = lambda x: 2*(x - 3)
d2f = lambda x: 2.0

x_opt, iters = newton_opt(df, d2f, x0=0, tol=1e-6)
print(f"Minimo encontrado en x = {x_opt:.6f}")
print(f"f(x) = {f(x_opt):.6f}")
print(f"Iteraciones: {len(iters)}")

x = np.linspace(-2, 8, 200)
plt.figure(figsize=(8, 5))
plt.plot(x, f(x), label='f(x) = (x-3)^2 + 2')
plt.scatter(iters, [f(xi) for xi in iters], color='red', zorder=5, label='Iteraciones')
plt.axvline(x_opt, color='red', linestyle='--', alpha=0.5)
plt.legend()
plt.grid(True)
plt.title('Newton (Optimizacion): convergencia al minimo')
plt.show()
```
