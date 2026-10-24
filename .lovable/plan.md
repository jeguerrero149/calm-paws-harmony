# Quitar "Chill" del nombre y suavizar la portada

## 1. Nombre sin "Chill"
- El logo del menú superior y del pie de página muestra solo **FIL** (misma letra Londrina Solid, mismos colores).
- El nombre en la pestaña del navegador y en Google pasa de "FIL Chill - ..." a **"FIL - Suplemento en polvo para la calma de tu perro"**.
- El nombre del producto (Fil-Chill) no cambia en las tarjetas ni en los testimonios.

## 2. Portada menos agresiva
- El fondo deja de ser Lemon Lime. Pasa a **Indigo** (el color principal del manual), con el título en blanco y la mascota en línea blanca.
- El Lemon queda solo como acento: el bloque detrás de la palabra "PERROS" (Russian Violet con letras Lemon) y el botón "Comprar ahora".
- Las figuras decorativas flotantes se reducen y se bajan de intensidad para que la portada se sienta más tranquila.
- Para no tener dos bloques Indigo seguidos, la sección de productos destacados pasa a fondo claro con tarjetas de color.

## Detalles técnicos
- `FilLogo.tsx`: quitar la línea "Chill"; `aria-label` = "FIL".
- `index.html`: actualizar title, description y og/twitter.
- `Hero.tsx`: `combo-lemon` a `combo-indigo`, imagen `fil-chill-perro-blanco.svg` sobre `bg-pelambre-indigo`, título en `text-white`, figuras con menos opacidad.
- `Index.tsx`: quitar `combo-indigo` de `#products` (queda con el fondo claro).
