---
slug: gauss-simple
nombre: Gauss simple
capitulo: Eliminacion de Gauss
parte: Ecuaciones algebraicas lineales
descripcion: >
  Resuelve sistemas de ecuaciones lineales Ax = b mediante eliminacion gaussiana
  con sustitucion hacia atras. No incluye pivoteo.
parametros:
  tolerancia: 0.0001
---

# Eliminacion de Gauss Simple

La eliminacion gaussiana transforma el sistema \(Ax = b\) en una forma triangular superior
mediante operaciones elementales de fila, y luego resuelve por sustitucion hacia atras.

## Algoritmo

1. Eliminacion hacia adelante: convertir la matriz A en triangular superior
2. Sustitucion hacia atras: resolver desde la ultima ecuacion hasta la primera

## Codigo

```python
import numpy as np
import matplotlib.pyplot as plt

def gauss_simple(A, b):
    n = len(b)
    Ab = np.column_stack([A.astype(float), b.astype(float)])

    for k in range(n - 1):
        for i in range(k + 1, n):
            if Ab[k, k] == 0:
                raise ValueError("Pivote cero: se requiere pivoteo")
            factor = Ab[i, k] / Ab[k, k]
            Ab[i, k:] = Ab[i, k:] - factor * Ab[k, k:]

    x = np.zeros(n)
    for i in range(n - 1, -1, -1):
        x[i] = (Ab[i, -1] - np.dot(Ab[i, i+1:n], x[i+1:n])) / Ab[i, i]
    return x

A = np.array([[3, -0.1, -0.2], [0.1, 7, -0.3], [0.3, -0.2, 10]])
b = np.array([7.85, -19.3, 71.4])

x = gauss_simple(A, b)
print("Solucion del sistema:")
for i, xi in enumerate(x):
    print(f"  x{i+1} = {xi:.6f}")

b_ver = A @ x
error = np.max(np.abs(b - b_ver))
print(f"Error maximo de verificacion: {error:.2e}")

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
ax1.imshow(A, cmap='Blues')
ax1.set_title('Matriz de coeficientes A')
for i in range(len(A)):
    for j in range(len(A)):
        ax1.text(j, i, f'{A[i,j]:.1f}', ha='center', va='center')
ax2.bar(range(1, len(x)+1), x, color='steelblue')
ax2.set_title('Solucion x')
ax2.set_xlabel('Variable')
ax2.axhline(0, color='gray', linewidth=0.5)
plt.tight_layout()
plt.show()
```
