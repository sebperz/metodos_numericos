---
slug: gradiente
nombre: Gradiente descendente
capitulo: Optimizacion multivariable
parte: Raices y optimizacion
descripcion: >
  Busca el minimo de una funcion siguiendo la direccion opuesta al gradiente.
  Metodo de primer orden ampliamente usado en machine learning.
parametros:
  x0: 5
  y0: 5
  alpha: 0.1
  tolerancia: 0.0001
---

# Gradiente Descendente

El metodo del gradiente descendente minimiza funciones multivariables moviendose
iterativamente en la direccion de maximo descenso (opuesta al gradiente).

## Algoritmo

1. Elegir punto inicial \(\mathbf{x}_0\) y tasa de aprendizaje \(\alpha\)
2. Calcular \(\mathbf{x}_{i+1} = \mathbf{x}_i - \alpha \nabla f(\mathbf{x}_i)\)
3. Repetir hasta convergencia

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def gradiente_desc(f, grad, x0, alpha=0.1, tol=1e-6, max_iter=200):
    x = np.array(x0, dtype=float)
    trayectoria = [x.copy()]
    for _ in range(max_iter):
        g = grad(x)
        if np.linalg.norm(g) < tol:
            break
        x = x - alpha * g
        trayectoria.append(x.copy())
    return x, np.array(trayectoria)

def f(xy):
    x, y = xy
    return x**2 + y**2 - 4*x + 2*y + 5

def grad(xy):
    x, y = xy
    return np.array([2*x - 4, 2*y + 2])

x_opt, path = gradiente_desc(f, grad, x0=[5, 5], alpha=0.1, tol=1e-6)
print(f"Minimo en x = ({x_opt[0]:.4f}, {x_opt[1]:.4f})")
print(f"f(x) = {f(x_opt):.6f}")
print(f"Iteraciones: {len(path)}")

x = np.linspace(-2, 6, 100)
y = np.linspace(-4, 6, 100)
X, Y = np.meshgrid(x, y)
Z = f([X, Y])

plt.figure(figsize=(8, 7))
plt.contour(X, Y, Z, levels=30, cmap='Blues', alpha=0.6)
plt.plot(path[:, 0], path[:, 1], 'r.-', markersize=6, label='Trayectoria')
plt.scatter(*x_opt, color='red', s=100, zorder=5, label='Minimo')
plt.colorbar(label='f(x, y)')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.title('Gradiente Descendente: trayectoria en curvas de nivel')
plt.axis('equal')
plt.show()
```
