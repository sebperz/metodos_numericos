---
slug: punto-fijo
nombre: Punto fijo
capitulo: Raices de ecuaciones
parte: Raices y optimizacion
descripcion: >
  Transforma la ecuacion f(x)=0 en x=g(x) e itera hasta converger al punto fijo.
  Converge si |g'(x)| < 1 en la vecindad de la raiz.
parametros:
  funcion: "x**2 - 4"
  x0: 1
  tolerancia: 0.0001
---

# Metodo del Punto Fijo

El metodo del punto fijo reformula la ecuacion \(f(x) = 0\) como \(x = g(x)\).
Partiendo de un valor inicial, se itera \(x_{i+1} = g(x_i)\) hasta converger.

La convergencia depende de que \(|g'(x)| < 1\) cerca de la raiz.

## Algoritmo

1. Reescribir \(f(x) = 0\) como \(x = g(x)\)
2. Elegir \(x_0\)
3. Iterar: \(x_{i+1} = g(x_i)\)
4. Si \(|x_{i+1} - x_i| < \text{tolerancia}\), terminar

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def punto_fijo(g, x0, tol=1e-6, max_iter=200):
    x = x0
    iteraciones = [x]
    for _ in range(max_iter):
        x_nuevo = g(x)
        iteraciones.append(x_nuevo)
        if abs(x_nuevo - x) < tol:
            break
        x = x_nuevo
    return x_nuevo, iteraciones

# f(x) = x^2 - 4 = 0  =>  x = 4/x  (una posible g(x))
def g(x):
    return 4 / x if x != 0 else float('inf')

raiz, iters = punto_fijo(g, x0=1, tol=1e-6)
print(f"Punto fijo encontrado: {raiz:.6f}")
print(f"f(raiz) = {raiz**2 - 4:.2e}")
print(f"Iteraciones: {len(iters)}")

x = np.linspace(0.5, 5, 200)
plt.figure(figsize=(8, 5))
plt.plot(x, x, 'k--', label='y = x', alpha=0.5)
plt.plot(x, g(x), label='g(x) = 4/x')
plt.plot(iters, iters, 'r.-', markersize=4, label='Iteraciones')
plt.legend()
plt.grid(True)
plt.title('Metodo del Punto Fijo: convergencia en escalera')
plt.show()
```
