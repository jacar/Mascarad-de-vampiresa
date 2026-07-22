---
Task ID: 1
Agent: Main Agent
Task: Crear landing page de invitación XV Años - Mascarada Vampiresa

Work Log:
- Inicializado entorno fullstack-dev con Next.js 16
- Copiada imagen de la quinceañera a /public/hero-quince.png
- Creado tema CSS personalizado con colores vampiros (vino, oro, negro)
- Actualizado layout.tsx con fuentes Cinzel + Cormorant Garamond
- Definido modelo Prisma GuestRsvp y sincronizado con SQLite
- Creado API route /api/rsvp (POST para confirmar, GET para conteo)
- Construida landing page completa con 7 secciones:
  1. Hero animado con Ken Burns effect sobre la foto
  2. Cuenta regresiva en tiempo real
  3. Detalles del evento con mapa y calendario
  4. Código de vestimenta con paleta de colores interactiva
  5. Sección de padres
  6. Formulario RSVP con BD persistente
  7. Footer elegante
- Partículas flotantes doradas/rojas como efecto atmosférico
- Verificado con Agent Browser (mobile y desktop), sin errores
- API RSVP testeada exitosamente

Stage Summary:
- Landing page funcional y verificada en móvil y desktop
- RSVP persistente en base de datos SQLite
- Todos los datos del evento incluidos correctamente
- Preview en: https://preview-<bot-id>.space-z.ai/