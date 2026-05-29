---
slug: gauss-seidel
nombre: Gauss-Seidel
capitulo: Eliminacion de Gauss
parte: Ecuaciones algebraicas lineales
descripcion: >
  Metodo iterativo para sistemas lineales que utiliza los valores mas recientes
  en cada paso. Converge mas rapido que Jacobi para matrices diagonalmente dominantes.
parametros:
  tolerancia: 0.0001
---

# Gauss-Seidel

El metodo de Gauss-Seidel resuelve \(Ax = b\) iterativamente. A diferencia de Jacobi,
utiliza los valores recien calculados en la misma iteracion, acelerando la convergencia.

## Algoritmo

1. Proponer un vector inicial \(x^{(0)}\)
2. Para cada \(i\), calcular \(x_i^{(k+1)} = \frac{1}{a_{ii}}(b_i - \sum_{j<i} a_{ij}x_j^{(k+1)} - \sum_{j>i} a_{ij}x_j^{(k)})\)
3. Repetir hasta que \(\|x^{(k+1)} - x^{(k)}\| < \text{tolerancia}\)

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def gauss_seidel(A, b, tol=1e-6, max_iter=200):
    n = len(b)
    x = np.zeros(n)
    errores = []

    for _ in range(max_iter):
        x_viejo = x.copy()
        for i in range(n):
            suma = b[i]
            for j in range(n):
                if j != i:
                    suma -= A[i, j] * x[j]
            x[i] = suma / A[i, i]
        err = np.max(np.abs(x - x_viejo))
        errores.append(err)
        if err < tol:
            break
    return x, errores

A = np.array([[4, 1, 1], [2, 5, 1], [1, 2, 6]], dtype=float)
b = np.array([12, 15, 14], dtype=float)

x, errores = gauss_seidel(A, b, tol=1e-8)
print("Solucion del sistema:")
for i, xi in enumerate(x):
    print(f"  x{i+1} = {xi:.6f}")
print(f"Iteraciones: {len(errores)}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.semilogy(errores, 'b.-', markersize=4)
ax1.set_title('Convergencia de Gauss-Seidel')
ax1.set_xlabel('Iteracion')
ax1.set_ylabel('Error maximo')
ax1.grid(True)
ax2.bar(range(1, len(x)+1), x, color='steelblue')
ax2.set_title('Solucion x')
ax2.set_xlabel('Variable')
ax2.axhline(0, color='gray', linewidth=0.5)
plt.tight_layout()
plt.show()
```
