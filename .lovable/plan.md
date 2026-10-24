# Más energía: mezclar las 3 combinaciones de la paleta FIL

## Idea
Hoy casi toda la página tiene fondo claro con detalles en Indigo. Las dos paletas nuevas permiten alternar **bloques de color completos** por sección, y cada bloque sigue las reglas de su combinación. Así la página se siente más intensa al hacer scroll, sin romper el manual.

```text
Combinación 01 (Indigo)          fondo Indigo, textos Blanco, mascota blanca
Combinación 02 (Russian Violet)  fondo Russian Violet, títulos/bloques Lemon Lime, textos Blanco
Combinación 03 (Lemon Lime)      fondo Lemon Lime, textos/líneas/mascota Russian Violet
Acentos en todas (poca cantidad): Bittersweet (promos), Sky Magenta (íconos), Menta, Indigo (detalles)
```

## Cómo queda cada página (de arriba a abajo)

**Inicio**
1. Portada: fondo **Lemon Lime** (03), con el título grande en Russian Violet y la mascota en línea violeta. Es el golpe de energía al entrar.
2. Productos destacados: fondo **Indigo** (01), tarjetas blancas.
3. Beneficios y números: fondo **Russian Violet** (02), títulos en Lemon Lime.
4. Testimonios: fondo **Lemon Lime** (03).
5. Llamado final a comprar: fondo **Indigo** (01), botón Lemon Lime.
6. Pie de página: **Russian Violet** (02), títulos en Lemon Lime (ya casi está así).

**Productos, Nosotros, Contacto**
- Encabezado de cada página con una combinación distinta (Productos: Lemon, Nosotros: Russian Violet, Contacto: Indigo) y el resto alternando de la misma manera.

**Menú superior**
- Se mantiene claro, con el botón "¡Comprar!" en Lemon Lime y borde violeta.

## Reglas que se respetan
- Ningún texto en Lemon, Bittersweet, Magenta o Menta sobre fondo Indigo, ni texto Indigo sobre Lemon (no se lee).
- Sobre Lemon Lime, todo el texto y la mascota van en Russian Violet.
- Logo: blanco sobre Indigo y Violet, Russian Violet sobre Lemon y blanco.
- Los títulos actuales de la portada ("CALMA" en coral, "COOL" en rosado) pasan a Russian Violet con una sola palabra resaltada en un bloque de color, para no tener texto de acento sobre fondo de color.

## Detalles técnicos
- Utilidades nuevas en `index.css`: `.combo-indigo`, `.combo-violet`, `.combo-lemon`. Cada una define fondo, color de texto y redefine `--primary`, `--accent`, `--border` y `--foreground` dentro de la sección, para que las tarjetas, botones y bordes de adentro se adapten solos.
- `FilLogo` y las imágenes de la mascota eligen la versión blanca o violeta según la sección (se agrega `FIL_Chill_perro-completo_russian-violet.svg` y la cara violeta a `src/assets`).
- Se editan `Hero.tsx`, `Index.tsx`, `Products.tsx`, `About.tsx`, `Contact.tsx`, `Footer.tsx`, `ProductCard.tsx` y `TestimonialCard.tsx` solo en clases de color de sección; el contenido no cambia.
- Se actualiza la memoria de color con las tres combinaciones y sus proporciones.
