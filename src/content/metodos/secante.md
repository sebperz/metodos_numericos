---
slug: secante
nombre: Secante
capitulo: Raices de ecuaciones
parte: Raices y optimizacion
descripcion: >
  Alternativa a Newton-Raphson que no requiere la derivada de la funcion.
  Usa una aproximacion por diferencias finitas entre dos puntos consecutivos.
parametros:
  funcion: "x**2 - 4"
  x0: 0
  x1: 10
  tolerancia: 0.0001
---

# Metodo de la Secante

El metodo de la secante reemplaza la derivada en Newton-Raphson por una aproximacion de
diferencias finitas. Requiere dos valores iniciales pero no necesita calcular la derivada
analiticamente.

## Algoritmo

1. Elegir dos valores iniciales \(x_0\) y \(x_1\)
2. Calcular \(x_{i+1} = x_i - f(x_i)\frac{x_i - x_{i-1}}{f(x_i) - f(x_{i-1})}\)
3. Si \(|f(x_{i+1})| < \text{tolerancia}\), terminar
4. Repetir desde el paso 2

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def secante(f, x0, x1, tol=1e-6, max_iter=100):
    x_ant, x_act = x0, x1
    iteraciones = [x0, x1]
    for _ in range(max_iter):
        f_ant, f_act = f(x_ant), f(x_act)
        if abs(f_act - f_ant) < 1e-15:
            break
        x_nuevo = x_act - f_act * (x_act - x_ant) / (f_act - f_ant)
        iteraciones.append(x_nuevo)
        if abs(f(x_nuevo)) < tol:
            break
        x_ant, x_act = x_act, x_nuevo
    return x_nuevo, iteraciones

f = lambda x: x**2 - 4

raiz, iters = secante(f, x0=0, x1=10, tol=1e-6)
print(f"Raiz encontrada: {raiz:.6f}")
print(f"f(raiz) = {f(raiz):.2e}")
print(f"Iteraciones: {len(iters)}")

x = np.linspace(-5, 5, 200)
plt.figure(figsize=(8, 5))
plt.plot(x, f(x), label='f(x) = x^2 - 4')
plt.axhline(0, color='gray', linewidth=0.5)
plt.scatter(iters, [f(xi) for xi in iters], color='red', zorder=5, label='Iteraciones')
plt.legend()
plt.grid(True)
plt.title('Metodo de la Secante: convergencia')
plt.show()
```
