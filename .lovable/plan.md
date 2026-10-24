# Adaptar la web al Manual de Marca FIL Chill v1.0

## Lo que cambia según el manual

**1. Tipografía (el cambio más visible)**
- Títulos: Londrina Solid Black, siempre en mayúsculas, interlineado ajustado (88 %). Reemplaza a Bebas Neue.
- Todo lo demás: Archivo (Black para subtítulos, Bold para datos destacados, Regular para textos, Light para notas legales). Reemplaza a Barlow, Rubik y las fuentes antiguas que aún se cargan (Montserrat, Playfair, Inter).

**2. Color**
- La paleta actual ya coincide en valores (Indigo, Russian Violet, Lemon Lime, Bittersweet, Sky Magenta). Se agrega **Menta #73DEB7** y se retira el crema como color de marca.
- Indigo pasa a ser el color dominante de la web (fondos de secciones principales), Russian Violet para textos y bloques de peso; Lemon, Bittersweet, Magenta y Menta solo como acentos pequeños (sellos, etiquetas "Nuevo", íconos, detalles).
- Regla del manual: los acentos nunca se usan como color de texto sobre Indigo. Se revisan títulos y textos que hoy lo hacen y se pasan a Blanco o Russian Violet.
- El "negro" de bordes y sombras pasa a Russian Violet para que todo se sienta de la misma familia.

**3. Logotipo**
- Navbar y footer muestran el logotipo "FIL / Chill" (versión principal o negativa según el fondo), en lugar del texto "Fil" escrito con otra fuente, que el manual prohíbe.
- Sin rotaciones, sombras ni efectos sobre el logo (hoy el footer lo rota al pasar el mouse: se elimina).
- Versión sello (circular) para el favicon y elementos redondos.
- Tamaño mínimo en pantalla: 72 px de ancho.

**4. Textos de producto**
- Se mantiene el nombre Fil-Chill; se reemplazan menciones a "snacks" en el título y descripción para buscadores por "suplemento en polvo para la calma".

## Lo que NO cambia
- Estructura de páginas, contenido, WhatsApp, carrito y panel /admin (solo heredan las nuevas fuentes y colores).

## Pregunta abierta
El manual muestra el logotipo, pero no tengo el archivo vectorial. Lo recreo como texto con Londrina Solid ("FIL") y Archivo Black ("Chill") imitando el manual; si tienes el SVG/PNG oficial, súbelo y lo uso en su lugar.

## Detalles técnicos
- `index.html`: cargar Londrina Solid (900) + Archivo (300/400/700/900) desde Google Fonts; actualizar title/description/og.
- `index.css`: quitar imports de Montserrat/Playfair/Inter; redefinir tokens HSL (`--primary` Indigo, `--foreground` Russian Violet, `--accent` Lemon, etc.); `.pelambre-border` con Russian Violet; h1–h6 uppercase + `leading-[0.88]`.
- `tailwind.config.ts`: `fontFamily.display = Londrina Solid`, `sans = Archivo`; agregar `pelambre.mint`.
- Componente nuevo `FilLogo` (variantes principal/negativo/positivo/sello) usado en Navbar y Footer.
- Revisión de Hero, Index, About, Contact, Products, ProductCard, Footer para la regla de acentos sobre Indigo.
- Guardar en memoria la nueva tipografía y paleta (reemplaza las notas de Bebas/Barlow/Rubik y Cream).
