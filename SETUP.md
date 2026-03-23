# Guía de Configuración - Estudiemos

## 🚀 Pasos para Configurar el Proyecto

### Paso 1: Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Click en **"New Project"** o **"New organization"**
4. Completa:
   - **Name**: `estudiemos`
   - **Database Password**: Guarda en un lugar seguro
   - **Region**: Selecciona la más cercana a ti
5. Espera a que se cree (5-10 minutos)

### Paso 2: Obtener Credenciales de Supabase

1. En el dashboard de Supabase, ve a **Settings** (⚙️) en la esquina inferior izquierda
2. Selecciona **API**
3. Copia:
   - **Project URL** → `PUBLIC_SUPABASE_URL` en `.env.local`
   - **anon public** key (bajo "Project API keys") → `PUBLIC_SUPABASE_ANON_KEY`

### Paso 3: Configurar Google OAuth en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. **Crear un nuevo proyecto**:
   - Click en el selector de proyecto en la parte superior
   - Click en **NEW PROJECT**
   - Nombre: `Estudiemos` (o similar)
   - Click en **CREATE**

3. **Configurar OAuth consent screen**:
   - En el menú izquierdo: **APIs & Services** → **OAuth consent screen**
   - Selecciona **External** y click en **CREATE**
   - Completa:
     - **App name**: `Estudiemos`
     - **User support email**: Tu email
     - **Developer contact**: Tu email
   - Click en **SAVE AND CONTINUE**
   - En "Scopes": Click en **ADD OR REMOVE SCOPES**
   - Busca y selecciona:
     - `userinfo.email`
     - `userinfo.profile`
     - `openid`
   - Click en **UPDATE**
   - Click en **SAVE AND CONTINUE**
   - Click en **SAVE AND CONTINUE** nuevamente

4. **Crear OAuth 2.0 Credentials**:
   - En el menú: **APIs & Services** → **Credentials**
   - Click en **+ CREATE CREDENTIALS** → **OAuth client ID**
   - Selecciona **Web application**
   - Nombre: `Estudiemos Web`
   - En **Authorized JavaScript origins**, agrega:
     ```
     http://localhost:3000
     https://tudominio.com (después, cuando despliegues)
     ```
   - En **Authorized redirect URIs**, agrega:
     ```
     http://localhost:3000/auth/callback
     https://tudominio.com/auth/callback (después)
     ```
   - Click en **CREATE**
   - Verás el **Client ID** y **Client Secret** - guárdalos

### Paso 4: Configurar Google en Supabase

1. En Supabase Dashboard, ve a **Authentication** (en el menú izquierdo)
2. Selecciona **Providers**
3. Busca **Google** y click en la fila
4. Habilita con el toggle de la derecha
5. Pega:
   - **Client ID** de Google Cloud
   - **Client Secret** de Google Cloud
6. En **Redirect URL** copiarás y pegarás esta URL en Google Cloud Console (si aún no lo hiciste):
   ```
   https://[your-project].supabase.co/auth/v1/callback
   ```
7. Click en **SAVE**

### Paso 5: Configurar Variables de Entorno

1. Abre `.env.local` en la raíz del proyecto
2. Reemplaza los valores:

```env
# Supabase
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Claude API (si deseas usar Claude)
SECRET_ANTHROPIC_API_KEY=sk-ant-...
```

### Paso 6: Instalar Dependencias (Si no lo hiciste)

```bash
npm install
```

### Paso 7: Ejecutar el Proyecto

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

---

## 🧪 Pruebas

1. Abre `http://localhost:3000/login`
2. Click en **"Iniciar sesión con Google"**
3. Deberías ser redirigido a Google para autenticarte
4. Después de autenticarte, serás redirigido al dashboard

---

## 🆘 Solución de Problemas

### "El cliente no puede ser encontrado"
- Verifica que `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` sean correctos en `.env.local`
- Reinicia el servidor de desarrollo

### "Error en Google OAuth"
- Verifica que la URL de redirección en Google Cloud coincida exactamente
- Asegúrate de haber habilitado Google en Supabase
- Verifica que el Client ID y Secret sean correctos

### "Componente no se carga en el dashboard"
- Verifica que hayas agregado `client:load` al componente en la página Astro
- Reinicia el servidor de desarrollo

---

## 📚 Próximos Pasos

Una vez que la autenticación funcione:
- [ ] Crear tablas en Supabase para usuarios
- [ ] Agregar más componentes al dashboard
- [ ] Implementar la integración con Claude
- [ ] Crear páginas de cursos
- [ ] Configurar el despliegue en producción
