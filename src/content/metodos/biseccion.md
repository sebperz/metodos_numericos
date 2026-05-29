---
slug: biseccion
nombre: Bisección
capitulo: raices-de-ecuaciones
parte: raices-y-optimizacion
descripcion: >
  Encuentra la raíz de una función continua dividiendo repetidamente
  un intervalo a la mitad y seleccionando el subintervalo que contiene
  el cambio de signo.
parametros:
  funcion: "x**2 - 4"
  intervalo: [0, 10]
  tolerancia: 0.0001
---

# Bisección

El método de bisección es uno de los algoritmos más simples para encontrar
raíces de funciones continuas. También se conoce como método de búsqueda
binaria o método de partición de intervalos.

## Algoritmo

1. Elegir valores iniciales $a$ y $b$ tales que $f(a) \cdot f(b) < 0$
2. Calcular el punto medio: $c = \frac{a + b}{2}$
3. Si $f(c) = 0$ o $(b - a)/2 < \text{tolerancia}$, terminar
4. Si $f(a) \cdot f(c) < 0$, entonces $b = c$; si no, $a = c$
5. Repetir desde el paso 2

## Código

```python
import numpy as np
import matplotlib.pyplot as plt

def biseccion(f, a, b, tol=1e-6):
    if f(a) * f(b) >= 0:
        raise ValueError("f(a) y f(b) deben tener signos opuestos")
    while (b - a) / 2 > tol:
        c = (a + b) / 2
        if f(c) == 0:
            return c
        if f(a) * f(c) < 0:
            b = c
        else:
            a = c
    return (a + b) / 2

f = lambda x: x**2 - 4
raiz = biseccion(f, 0, 10, tol=1e-6)
print(f"Raiz encontrada: {raiz:.6f}")
print(f"f(raiz) = {f(raiz):.2e}")

x = np.linspace(0, 10, 200)
plt.plot(x, f(x), label='f(x) = x^2 - 4')
plt.axhline(0, color='gray', linewidth=0.5)
plt.axvline(raiz, color='red', linestyle='--', label=f'Raiz: {raiz:.4f}')
plt.legend()
plt.grid(True)
plt.show()
```

## Referencias

- Chapra, S. C., & Canale, R. P. *Métodos Numéricos para Ingenieros*
- Burden, R. L., & Faires, J. D. *Análisis Numérico*
