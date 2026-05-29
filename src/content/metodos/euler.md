---
slug: euler
nombre: Euler (EDO)
capitulo: Ecuaciones diferenciales ordinarias
parte: Ecuaciones diferenciales
descripcion: >
  Resuelve EDOs de primer orden por el metodo de Euler explicito.
  El mas simple de los metodos numericos para ecuaciones diferenciales.
parametros:
  dy_dt: "-2*y + np.sin(t)"
  y0: 1
  t0: 0
  tf: 5
  h: 0.1
---

# Metodo de Euler

El metodo de Euler resuelve \(\frac{dy}{dt} = f(t, y)\) paso a paso con la aproximacion:
\(y_{i+1} = y_i + h \cdot f(t_i, y_i)\).

Es un metodo de primer orden: el error local es \(O(h^2)\) y el global \(O(h)\).

## Algoritmo

1. Conocer \(y_0\) en \(t_0\)
2. Iterar: \(y_{i+1} = y_i + h \cdot f(t_i, y_i)\)
3. Avanzar \(t_{i+1} = t_i + h\)

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def euler(f, y0, t0, tf, h):
    n = int((tf - t0) / h)
    t = np.linspace(t0, tf, n + 1)
    y = np.zeros(n + 1)
    y[0] = y0
    for i in range(n):
        y[i+1] = y[i] + h * f(t[i], y[i])
    return t, y

def f(t, y):
    return -2*y + np.sin(t)

t0, tf = 0, 5
y0 = 1
h = 0.1

t, y_euler = euler(f, y0, t0, tf, h)

# Solucion analitica: y(t) = (1 + 2/5)e^(-2t) + (2 sin(t) - cos(t))/5
y_exacta = (7/5)*np.exp(-2*t) + (2*np.sin(t) - np.cos(t))/5

print(f"Euler: y({tf}) = {y_euler[-1]:.6f}")
print(f"Exacto: y({tf}) = {y_exacta[-1]:.6f}")
print(f"Error: {abs(y_euler[-1] - y_exacta[-1]):.2e}")

plt.figure(figsize=(9, 5))
plt.plot(t, y_exacta, 'b-', linewidth=2, label='Solucion exacta')
plt.plot(t, y_euler, 'r.--', markersize=4, label=f'Euler (h={h})')
plt.xlabel('t')
plt.ylabel('y(t)')
plt.legend()
plt.grid(True)
plt.title("Metodo de Euler: y' = -2y + sin(t),  y(0) = 1")
plt.show()
```
