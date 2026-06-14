# Laminas Mundial 2026

Primera version web para que una comunidad privada coordine intercambios de laminas del Mundial 2026.

## Funciones incluidas

- Perfil activo por integrante de la comunidad.
- Registro de laminas que tengo, me faltan y tengo repetidas.
- Carga rapida por numeros separados por coma, espacio o salto de linea.
- Album demo de 980 laminas: 48 selecciones con 20 laminas cada una, mas 20 especiales.
- Orden base tomado del indice fotografiado: grupos A-L, con selecciones como `RSA`, `BIH`, `CUW`, `CPV`, `COD` y `UZB`.
- Codigos por seleccion en formato Panini, por ejemplo `ECU 1`, `ECU 20`, `BIH 1`, `BIH 20`.
- Laminas especiales `FWC 1-20` basadas en las fotos del album: emblema, simbolos, mascotas, balon oficial, anfitriones e historia del Mundial (`FWC 9-20`).
- Banderas reales por seleccion en la vista del album.
- Filtros por confederacion, grupo y seleccion.
- Cruce automatico de matches entre integrantes.
- Solicitudes de intercambio con estado pendiente, aceptada o rechazada.
- Agregar nuevos integrantes en modo demo local.
- Login y guardado online con Supabase cuando la app esta publicada en GitHub Pages.

## Como abrirla

Desde esta carpeta, ejecutar:

```powershell
python -m http.server 4177 --bind 127.0.0.1
```

Luego abrir:

```text
http://127.0.0.1:4177
```

Tambien puede abrirse directamente el archivo `index.html`, aunque para desarrollo conviene usar el servidor local.

## Nota sobre el checklist

El listado oficial completo de Panini puede cambiar por mercado o publicarse con ajustes. Esta version usa como referencia el indice fotografiado por el usuario: 48 selecciones, 20 laminas por seleccion y una seccion especial para llegar a 980 laminas. Cuando exista un checklist definitivo con nombres de jugadores por casilla, basta ajustar la lista `teams` y los titulos generados en `app.js`.

## Proximos pasos recomendados

- Login real y comunidades con codigo de invitacion.
- Base de datos compartida para que todos vean los cambios en tiempo real.
- Notificaciones por correo o WhatsApp.
- Importacion masiva desde planilla.
- Panel de administrador para colegios, condominios o universidades.

## Registro y datos online

Para que las personas no pierdan sus datos, la app publicada debe usar Supabase como backend.

Flujo sugerido:

1. Un administrador crea una comunidad y recibe un codigo de invitacion.
2. Cada usuario se registra con correo y contrasena, Google, o magic link.
3. Al ingresar el codigo, el usuario queda asociado a esa comunidad.
4. Las listas de `tengo`, `me falta` y `repetidas` se guardan en la base de datos por usuario.
5. Los matches se calculan cruzando los datos de usuarios dentro de la misma comunidad.

Stack recomendado: GitHub Pages + Supabase Auth + Supabase Postgres.

## Publicacion online

La app esta preparada para funcionar en tres modos:

- En `localhost`: demo local con `localStorage`.
- En GitHub Pages con `config.js` vacio: demo local.
- En GitHub Pages con Supabase configurado: login real y datos online.
- En Netlify: compatibilidad antigua con `/api`, mientras exista ese hosting.

## Configurar Supabase

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor y ejecutar completo `supabase-schema.sql`.
3. En Authentication > URL Configuration, agregar la URL de GitHub Pages en Site URL y Redirect URLs.
4. Copiar `config.example.js` como `config.js`.
5. Reemplazar `supabaseUrl` y `supabaseAnonKey`.
6. Confirmar que `backend` quede como `"supabase"`.

Ejemplo:

```js
window.APP_CONFIG = {
  backend: "supabase",
  supabaseUrl: "https://TU-PROYECTO.supabase.co",
  supabaseAnonKey: "TU_SUPABASE_ANON_KEY"
};
```

## Publicar en GitHub Pages

1. Crear un repositorio en GitHub, por ejemplo `laminas-mundial-2026`.
2. Subir esta carpeta al repositorio.
3. En GitHub, ir a Settings > Pages.
4. En Build and deployment elegir `Deploy from a branch`.
5. Elegir branch `main` y carpeta `/root`.
6. Guardar.

GitHub publicara una URL parecida a:

```text
https://TU-USUARIO.github.io/laminas-mundial-2026/
```

Luego esa URL debe agregarse en Supabase Authentication como URL permitida.

## Archivos heredados de Netlify

La carpeta conserva `netlify/functions/api.js`, `netlify.toml` y `package.json` por si se desea mantener o consultar la version anterior. Para GitHub Pages no son necesarios.
