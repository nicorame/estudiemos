# Estudiemos 🎓

Plataforma de aprendizaje inteligente para estudiantes, impulsada por Astro, React, TypeScript y Claude.

## Características

- **Astro** - Framework web rápido y moderno
- **React** - Componentes interactivos
- **TypeScript** - Tipado seguro
- **Supabase** - Base de datos y autenticación
- **Claude AI** - Tutorías inteligentes personalizadas
- **CSS** - Estilos modernos y responsivos

## Requisitos previos

- Node.js 16+ (recomendado 18+)
- npm o yarn
- Cuenta de Supabase
- API key de Anthropic (Claude)

## Instalación

1. **Clonar el repositorio**
   ```bash
   cd estudiemos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```

   Completa las variables con tus credenciales de Supabase y Anthropic.

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Build

Para crear una versión de producción:

```bash
npm run build
```

Para previsualizar la versión de producción:

```bash
npm run preview
```

## Estructura del proyecto

```
src/
├── pages/          # Rutas y páginas
├── components/     # Componentes React reutilizables
├── layouts/        # Layouts de Astro
├── styles/         # Estilos globales y componentes
├── lib/            # Utilidades y configuraciones
│   ├── supabase.ts # Cliente de Supabase
│   └── claude.ts   # Cliente de Claude/Anthropic
└── utils/          # Funciones de utilidad

public/             # Archivos estáticos
```

## Configuración de Supabase

Para configurar Supabase en el proyecto:

1. Crea un proyecto en [supabase.com](https://supabase.com)
2. Obtén la URL y la clave anónima del proyecto
3. Configúralas en `.env.local`

## Configuración de Claude API

1. Obtén tu API key en [console.anthropic.com](https://console.anthropic.com)
2. Configúrala en `.env.local` como `SECRET_ANTHROPIC_API_KEY`

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run astro` - Acceso directo a comandos de Astro

## Licencia

MIT
