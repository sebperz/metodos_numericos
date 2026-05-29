---
slug: runge-kutta
nombre: Runge-Kutta 4to orden
capitulo: Ecuaciones diferenciales ordinarias
parte: Ecuaciones diferenciales
descripcion: >
  Metodo RK4: el caballo de batalla para EDOs. Cuarto orden de precision
  evaluando la funcion en cuatro puntos intermedios por paso.
parametros:
  dy_dt: "-2*y + np.sin(t)"
  y0: 1
  t0: 0
  tf: 5
  h: 0.25
---

# Runge-Kutta de Cuarto Orden (RK4)

El metodo RK4 evalua la funcion \(f(t, y)\) en cuatro puntos dentro de cada paso
para lograr precision de cuarto orden (\(O(h^4)\)).

## Algoritmo

1. \(k_1 = h \cdot f(t_i, y_i)\)
2. \(k_2 = h \cdot f(t_i + h/2, y_i + k_1/2)\)
3. \(k_3 = h \cdot f(t_i + h/2, y_i + k_2/2)\)
4. \(k_4 = h \cdot f(t_i + h, y_i + k_3)\)
5. \(y_{i+1} = y_i + \frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)\)

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def rk4(f, y0, t0, tf, h):
    n = int((tf - t0) / h)
    t = np.linspace(t0, tf, n + 1)
    y = np.zeros(n + 1)
    y[0] = y0
    for i in range(n):
        k1 = f(t[i], y[i])
        k2 = f(t[i] + h/2, y[i] + h*k1/2)
        k3 = f(t[i] + h/2, y[i] + h*k2/2)
        k4 = f(t[i] + h, y[i] + h*k3)
        y[i+1] = y[i] + h*(k1 + 2*k2 + 2*k3 + k4) / 6
    return t, y

def f(t, y):
    return -2*y + np.sin(t)

t0, tf = 0, 5
y0 = 1
h_rk4 = 0.5
h_euler = 0.1

t_rk4, y_rk4 = rk4(f, y0, t0, tf, h_rk4)
y_exacta = (7/5)*np.exp(-2*t_rk4) + (2*np.sin(t_rk4) - np.cos(t_rk4))/5

print(f"RK4 (h={h_rk4}):  y({tf}) = {y_rk4[-1]:.6f}")
print(f"Exacto:   y({tf}) = {y_exacta[-1]:.6f}")
print(f"Error RK4:  {abs(y_rk4[-1] - y_exacta[-1]):.2e}")

# Comparacion Euler vs RK4
def euler(f, y0, t0, tf, h):
    n = int((tf - t0) / h)
    t = np.linspace(t0, tf, n + 1)
    y = np.zeros(n + 1)
    y[0] = y0
    for i in range(n):
        y[i+1] = y[i] + h * f(t[i], y[i])
    return t, y

_, y_euler = euler(f, y0, t0, tf, h_euler)

plt.figure(figsize=(9, 5))
t_fine = np.linspace(t0, tf, 200)
plt.plot(t_fine, (7/5)*np.exp(-2*t_fine) + (2*np.sin(t_fine) - np.cos(t_fine))/5,
         'k-', linewidth=1, label='Solucion exacta')
plt.plot(t_rk4, y_rk4, 'b.-', markersize=5, label=f'RK4 (h={h_rk4})')
marca = max(0, len(t_rk4)//3)
plt.plot(t_rk4[:marca:5], y_euler[:marca:5], 'r.--', markersize=4, alpha=0.6,
         label=f'Euler (h={h_euler})')
plt.xlabel('t')
plt.ylabel('y(t)')
plt.legend()
plt.grid(True)
plt.title("RK4 vs Euler: y' = -2y + sin(t),  y(0) = 1")
plt.show()
```
